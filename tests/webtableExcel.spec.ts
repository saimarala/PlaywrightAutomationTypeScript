import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

test('Extract debit data without eval', async ({ page }) => {
  await page.goto('https://example.com/bank-statement');

  // --- Use locators to get table rows ---
  const rows = page.locator('table tr');

  const webDebitData: { type: string; amount: string }[] = [];
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const type = await row.locator('td').nth(2).innerText();   // assuming column 3 = Type
    const amount = await row.locator('td').nth(3).innerText(); // assuming column 4 = Amount

    if (type.trim() === 'Debit') {
      webDebitData.push({ type: type.trim(), amount: amount.trim() });
    }
  }

  console.log('Web Debit Data:', webDebitData);

  // --- Download Excel ---
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadExcelBtn')
  ]);
  const excelPath = await download.path();
  if (!excelPath) throw new Error('Download failed');

  // --- Read Excel file ---
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData: any[] = XLSX.utils.sheet_to_json(sheet);

  // --- Filter debit rows from Excel ---
  const excelDebitData = excelData.filter((row: any) => row.Type === 'Debit');

  console.log('Excel Debit Data:', excelDebitData);

  // --- Compare both sets ---
  expect(webDebitData).toEqual(excelDebitData);
});

test('Extract full debit rows with for...of loop', async ({ page }) => {
  await page.goto('https://example.com/bank-statement');

  // --- Get all row locators ---
  const rows = await page.locator('table tr').all();

  const webDebitRows: string[][] = [];

  // --- Iterate with for...of to capture entire row ---
  for (const row of rows) {
    const cells = await row.locator('td').all();
    const rowData: string[] = [];

    for (const cell of cells) {
      rowData.push((await cell.innerText()).trim());
    }

    // Assuming column 3 (index 2) is "Type"
    if (rowData[2] === 'Debit') {
      webDebitRows.push(rowData);
    }
  }

  console.log('Web Debit Rows:', webDebitRows);

  // --- Download Excel ---
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadExcelBtn')
  ]);
  const excelPath = await download.path();
  if (!excelPath) throw new Error('Download failed');

  // --- Read Excel file ---
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // raw rows

  // --- Filter debit rows from Excel ---
  const excelDebitRows = excelData.filter(row => row[2] === 'Debit');

  console.log('Excel Debit Rows:', excelDebitRows);

  // --- Normalize and compare ---
  const normalize = (rows: any[][]) => rows.map(r => r.join('|')).sort();
  expect(normalize(webDebitRows)).toEqual(normalize(excelDebitRows));
});



// Utility function to extract transactions by type
async function extractTransactions(page, type: 'debit' | 'credit'): Promise<string[][]> {
  const rows = await page.locator('table#statement tbody tr').all();
  const filteredData: string[][] = [];

  for (const row of rows) {
    const cells = await row.locator('td').allTextContents();

    // Adjust index based on your table structure
    const transactionType = cells[2].toLowerCase();

    if (transactionType === type.toLowerCase()) {
      filteredData.push(cells);
    }
  }

  return filteredData;
}

test('Extract transactions by type and compare with Excel', async ({ page }) => {
  await page.goto('https://example.com/bank-statement');

  // Choose which type to extract: 'debit' or 'credit'
  const transactionType: 'debit' | 'credit' = 'debit';

  // Step 1: Extract filtered data
  const webData = await extractTransactions(page, transactionType);
  console.log(`${transactionType} transactions from web:`, webData);

  // Step 2: Write to Excel
  const worksheet = XLSX.utils.aoa_to_sheet(webData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${transactionType}Statement`);
  XLSX.writeFile(workbook, `${transactionType}_statement.xlsx`);

  // Step 3: Read back from Excel
  const file = XLSX.readFile(`${transactionType}_statement.xlsx`);
  const sheet = file.Sheets[`${transactionType}Statement`];
  const excelData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  console.log(`${transactionType} transactions from Excel:`, excelData);

  // Step 4: Assert both match
  expect(excelData).toEqual(webData);
});



//********************* */


test('Bank statement debit rows comparison', async ({ page }) => {
  await page.goto('https://example.com/bank-statement');

  // --- Extract all rows at once ---
  const allRows = await page.locator('table tr').all();
  const webDebitData = await Promise.all(
    allRows.map(async row => {
      const cells = await row.locator('td').allInnerTexts();
      if (cells[2]?.trim() === 'Debit') {
        return { type: cells[2].trim(), amount: cells[3].trim() };
      }
      return null;
    })
  ).then(results => results.filter(Boolean) as { type: string; amount: string }[]);

  console.log('Web Debit Data:', webDebitData);

  // --- Download Excel ---
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadExcelBtn'),
  ]);
  const excelPath = await download.path();
  if (!excelPath) throw new Error('Download failed');

  // --- Read Excel ---
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData: any[] = XLSX.utils.sheet_to_json(sheet);

  // --- Filter debit rows ---
  const excelDebitData = excelData
    .filter(row => String(row.Type).trim() === 'Debit')
    .map(row => ({
      type: String(row.Type).trim(),
      amount: String(row.Amount).trim(),
    }));

  console.log('Excel Debit Data:', excelDebitData);

  // --- Compare ---
  expect(webDebitData).toEqual(excelDebitData);
});