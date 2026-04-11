/*
Test: create booking
Request type: Post
Request body: static

Add url to playwright.config.ts file
	baseURL: 'https://restful-booker.herokuapp.com'
 
 
*/

import { test, expect } from "@playwright/test"

test("Create Post request using static body", async({ request }) => {

    //request body
    const requestBody = {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: "2025-07-01",
            checkout: "2025-07-05",
        },
        additionalneeds: "super bowls",
    }

    // send post request

    const response=await request.post("/booking",{data:requestBody});

    const responseBody=await response.json();  // Extractred response
    console.log(responseBody);
    
    //validate status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validate response body attributes
    expect(responseBody).toHaveProperty("bookingid")
    expect(responseBody).toHaveProperty("booking")
    expect(responseBody).toHaveProperty("booking.additionalneeds")

    //validate booking details
    const booking=responseBody.booking;


    expect(booking).toMatchObject({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 1000,
        depositpaid: true,
        additionalneeds: "super bowls",
    });

    //validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
            checkin: "2025-07-01",
            checkout: "2025-07-05",
        });



})




// ✅ Type for strong validation
interface BookingDates {
  checkin: string;
  checkout: string;
}

interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

test("Create Booking API - Enhanced Validation", async ({ request }) => {

  // 🔹 Request body
  const requestBody: Booking = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-07-01",
      checkout: "2025-07-05",
    },
    additionalneeds: "super bowls",
  };

  // 🔹 Send request
  const response = await request.post("/booking", {
    data: requestBody,
    headers: {
      "Content-Type": "application/json"
    }
  });

  // 🔹 Basic validations
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // 🔹 Response time validation (performance)
 // expect(response.request().timing()?.responseEnd).toBeLessThan(2000);

  // 🔹 Headers validation
  expect(response.headers()["content-type"]).toContain("application/json");

  // 🔹 Extract response
  const responseBody = await response.json();

  console.log("Response:", responseBody);

  // 🔹 Structure validation
  expect(responseBody).toMatchObject({
    bookingid: expect.any(Number),
    booking: expect.any(Object)
  });

  // 🔹 Deep property validation
  expect(responseBody.booking).toHaveProperty("firstname");
  expect(responseBody.booking).toHaveProperty("bookingdates.checkin");

  const booking = responseBody.booking as Booking;

  // 🔹 Exact match validation
  //expect(booking).toMatchObject(requestBody);

  // 🔹 Type validations
  expect(typeof booking.firstname).toBe("string");
  expect(typeof booking.totalprice).toBe("number");
  expect(typeof booking.depositpaid).toBe("boolean");

  // 🔹 Date format validation (Regex)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  expect(booking.bookingdates.checkin).toMatch(dateRegex);
  expect(booking.bookingdates.checkout).toMatch(dateRegex);

  // 🔹 Logical validation (checkin < checkout)
  const checkinDate = new Date(booking.bookingdates.checkin);
  const checkoutDate = new Date(booking.bookingdates.checkout);

  expect(checkoutDate.getTime()).toBeGreaterThan(checkinDate.getTime());

  // 🔹 Data consistency validation
  expect(booking.firstname).toBe(requestBody.firstname);
  expect(booking.lastname).toBe(requestBody.lastname);

});