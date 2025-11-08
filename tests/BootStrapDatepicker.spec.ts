import{test ,expect} from "@playwright/test"

test("Booking.com Date picker test - check-in and checkout",async({page})=>{
    await page.goto("https://www.booking.com/");
 await page.waitForTimeout(2000);
    //Click on the date picker field to open calender
    await page.getByTestId("searchbox-dates-container").click();
   // await page.locator("button[data-testid='searchbox-dates-container']").click();

    //===========Check-in Date Selection====
    let checkinYear:string="2026"
    let checkinMonth:string="June";
    let checkinDay:string="20";

    //navigate to through the calender to find the desired check-in month and year

    while(true){
        const checkInMonthYear=await page.locator("h3[aria-live='polite']").nth(0).innerText();
        const currentMonth=checkInMonthYear.split(" ")[0];
        const currentYear=checkInMonthYear.split(" ")[1];
    
        if (currentMonth===checkinMonth  && currentYear===checkinYear) {
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    //select the specific check-in date
    let allDates= await page.locator("table.b8fcb0c66a tbody").nth(0).locator("td").all();
    let checkinDateSelected=false;

    for(let date of allDates){
         const dateText=await date.innerText();
         if (dateText===checkinDay) {{
            await date.click();
            checkinDateSelected=true;
            break;
         }
            
         }
    }

    expect(checkinDateSelected).toBeTruthy();


    //**************************************** */

    //===========Check-in Date Selection====
    let checkOutYear:string="2026"
    let checkOutMonth:string="November";
    let checkOutDay:string="25";

    //navigate to through the calender to find the desired check-in month and year

    while(true){
        const checkInMonthYear=await page.locator("h3[aria-live='polite']").nth(1).innerText();
        const currentMonth=checkInMonthYear.split(" ")[0];
        const currentYear=checkInMonthYear.split(" ")[1];
    
        if (currentMonth===checkOutMonth  && currentYear===checkOutYear) {
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    //select the specific check-in date
    allDates= await page.locator("table.b8fcb0c66a tbody").nth(1).locator("td").all();
    let checkOutDateSelected=false;

    for(let date of allDates){
         const dateText=await date.innerText();
         if (dateText===checkOutDay) {{
            await date.click();
            checkOutDateSelected=true;
            break;
         }
            
         }
    }

    expect(checkOutDateSelected).toBeTruthy();

 
    await page.waitForTimeout(5000);
})