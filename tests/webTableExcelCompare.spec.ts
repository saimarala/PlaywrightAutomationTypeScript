

import { test, expect,Page } from '@playwright/test';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

//1. Extract Table Data from UI
async function getTableData(page: Page): Promise<string[][]> {
    const rows = page.locator('table tr');
    const data: string[][] = [];

    for (let i = 0; i < await rows.count(); i++) {
        const cells = rows.nth(i).locator('th, td');
        const row: string[] = [];

        for (let j = 0; j < await cells.count(); j++) {
            row.push((await cells.nth(j).innerText()).trim());
        }

        data.push(row);
    }

    return data;
}

//2.Download Excel File

test('Download Excel', async ({ page }) => {
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('text=Download Excel')
    ]);

    const path = await download.path();
    const filePath = `./downloads/${download.suggestedFilename()}`;
    
    await download.saveAs(filePath);

    console.log('Downloaded to:', filePath);
});

//3. Read Excel File (Using xlsx)


function readExcel(filePath: string): string[][] {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
    //Behavior of header: 1 option in xlsx is to return an array of arrays (2D array) where each inner array represents a row of the Excel sheet. The first row (header) will be included as the first inner array, and subsequent rows will follow as additional inner arrays. Each cell value is returned as a string, and empty cells are represented as empty strings.
//👉  Output becomes:
// [
//   ['Name', 'Age'],
//   ['Sai', '25'],
//   ['Ram', '30']
// ]

//Array of Arrays (2D array)
//It returns data as a 2D array instead of objects, making it easier to compare with UI table data using index-based loops.

    return jsonData.map(row => row.map(cell => String(cell).trim()));
}

//4. Compare UI vs Excel Data
function compareData(uiData: string[][], excelData: string[][]) {
    if (uiData.length !== excelData.length) {
        throw new Error('Row count mismatch');
    }

    for (let i = 0; i < uiData.length; i++) {
        for (let j = 0; j < uiData[i].length; j++) {
            if (uiData[i][j] !== excelData[i][j]) {
                throw new Error(`Mismatch at row ${i}, col ${j}`);
            }
        }
    }

    console.log('✅ Data matched successfully');
}
test('Compare Web Table with Excel', async ({ page }) => {

    // Step 1: Get UI data
    const uiData = await getTableData(page);

    // Step 2: Download file
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('text=Download Excel')
    ]);

    const filePath = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(filePath);

    // Step 3: Read Excel
    const excelData = readExcel(filePath);

    // Step 4: Compare
    compareData(uiData, excelData);
});