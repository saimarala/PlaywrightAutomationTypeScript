import { test ,expect,Page } from '@playwright/test';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

//1. Extract ONLY Debit Rows from UI
async function getDebitRowsFromUI(page: Page): Promise<string[][]> {
    const rows = page.locator('table tbody tr');
    const data: string[][] = [];

    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const cells = row.locator('td');

        const debitText = (await cells.nth(2).innerText()).trim(); // Debit column

        // Only include rows where Debit has value
        if (debitText !== '' && debitText !== '0') {
            const rowData: string[] = [];

            for (let j = 0; j < await cells.count(); j++) {
                rowData.push((await cells.nth(j).innerText()).trim());
            }

            data.push(rowData);
        }
    }

    return data;
}

//2. Download Excel (Debit Rows)
async function downloadDebitExcel(page: Page): Promise<string> {
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('text=Download Debit Excel') // button text
    ]);

    const filePath = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(filePath);

    return filePath;
}

//3. Read Excel File (Using xlsx)
function getDebitRowsFromExcel(filePath: string): string[][] {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Remove header row
    const data = jsonData.slice(1);

    // Filter only Debit rows (assuming Debit column index = 2)
    const debitRows = data.filter(row => {
        const debit = String(row[2] || '').trim();
        return debit !== '' && debit !== '0';
    });

    return debitRows.map(row =>
        row.map(cell => String(cell || '').trim())
    );
}

//4. Compare UI and Excel Data
function compareData(uiData: string[][], excelData: string[][]) {

    if (uiData.length !== excelData.length) {
        throw new Error(`Row count mismatch: UI=${uiData.length}, Excel=${excelData.length}`);
    }

    for (let i = 0; i < uiData.length; i++) {
        for (let j = 0; j < uiData[i].length; j++) {

            if (uiData[i][j] !== excelData[i][j]) {
                throw new Error(
                    `Mismatch at row ${i}, col ${j}: UI=${uiData[i][j]} | Excel=${excelData[i][j]}`
                );
            }
        }
    }

    console.log('✅ Debit rows match between UI and Excel');
}

test('Validate Debit Rows UI vs Excel', async ({ page }) => {

    // Step 1: Extract Debit rows from UI
    const uiDebitData = await getDebitRowsFromUI(page);

    // Step 2: Download Excel
    const filePath = await downloadDebitExcel(page);

    // Step 3: Read Excel
    const excelData = getDebitRowsFromExcel(filePath);

    // Step 4: Compare
    compareData(uiDebitData, excelData);
});

