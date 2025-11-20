
import { test, expect } from '@playwright/test';

test('Single File Upload',async ({page})=>{

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator('#filesToUpload').setInputFiles('uploads/testfile1.pdf');
    expect(page.locator('#fileList li:nth-child(1)')).toHaveText('testfile1.pdf')
    await page.waitForTimeout(3000); 
})

test('Multiple Files',async ({page})=>{

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
       
    //upload multiple files
    await page.locator('#filesToUpload').setInputFiles(['uploads/testfile1.pdf','uploads/testfile2.pdf']);
       
    expect(page.locator('#fileList li:nth-child(1)')).toHaveText('testfile1.pdf')
    expect(page.locator('#fileList li:nth-child(2)')).toHaveText('testfile2.pdf')
   
    // Remove all the selected files
    await page.locator('#filesToUpload').setInputFiles([]); // Pass Empty array, that will clear the box
    await page.waitForTimeout(3000);
    expect(page.locator('#fileList li:nth-child(1)')).toHaveText('No Files Selected')
    await page.waitForTimeout(5000);
})