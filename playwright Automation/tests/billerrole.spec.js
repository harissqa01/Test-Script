// @ts-check
const { test, expect } = require('@playwright/test');

let page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto('https://example.com');
  await page.getByLabel('Username').fill('teambiller');
  await page.getByLabel('Password').fill('Test123$');
  await page.getByLabel('Username').click();
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.waitForTimeout(1000);
  try{
    await expect(page.getByText('Yes')).toBeVisible();
    await page.getByText('Yes').click();
  }catch(error){
    
    console.log("there is no dialodbox");
  }
});


test.describe('Search Icon', () => {

    
    test('BR-TC-01', async () => { 
        await page.isVisible('#wrapper_topbar__1WOmD > div:nth-child(2) > .MuiButtonBase-root');
        await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
        //First name last name, DOB , and Phone number fields section should appear
        await page.locator('#wrapper_topbar__1WOmD div').filter({ hasText: 'First NameFirst NameLast NameLast NameDOBDOBSearch' }).nth(1);
    });


    test('BR-TC-02 & 03 & 05 & 06', async () => {

      await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
      //Click on the first name field and enter first name of the patient that exists in the practice and then click on the Search button

        await page.getByLabel('First Name').click();
        await page.getByLabel('First Name').fill('maria');

        await page.getByLabel('Last Name').click();
        await page.getByLabel('Last Name').fill('Alvarez');

        await page.getByRole('button', { name: 'Search' }).click();
        await page.waitForSelector("//table[@class='table table-sm table-hover']")
        const elements = await page.$$("//table[@class='table table-sm table-hover']//tbody/tr")
        for (const element of elements){
            const ListElements = await element.textContent();
            console.log(ListElements);
        }
        if (elements.length > 0) {
            // Get the first row
            const firstRow = elements[0];
          
            // Find an element within the first row and click on it
            const elementInFirstRow = await firstRow.$("//td[@class='text-capitalize'][normalize-space()='hello']"); // Replace with your element's selector
            if (elementInFirstRow) {
              await elementInFirstRow.click();
            } else {
              console.log("Element not found in the first row.");
            }
          } else {
            console.log("No rows found in the table.");
          }
        // await page.locator('#wrapper_globalSearch__Y--2V').getByRole('cell', { name: 'Maria' }).click();
        const pastdata = await page.locator("//h4[normalize-space()='hello , world']")
        await expect(pastdata).toBeVisible();
        
    });

        test('BR-TC-04', async () => { 
            //First name field with invalid data
            await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
            //Click on the first name field and enter first name of the patient that not exists in the practice and then click on the Search button

            await page.getByLabel('First Name').click();
            await page.getByLabel('First Name').fill('42343rewrwerwe');
            await page.getByRole('button', { name: 'Search' }).click();
            const noRecord = await page.locator("//h6[normalize-space()='No record found']")
            await expect(noRecord).toBeVisible();
        
    });


            test('BR-TC-07', async () => { 
            //First name field with invalid data
            await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
            //Click on the first name field and enter first name of the patient that not exists in the practice and then click on the Search button
            await page.getByLabel('Last Name').click();
            await page.getByLabel('Last Name').fill('42343rewrwerwe');
            await page.getByRole('button', { name: 'Search' }).click();            
            const noRecord = await page.locator("//h6[normalize-space()='No record found']")
            await expect(noRecord).toBeVisible();
        
    });


    test('BR-TC-08', async () => { 

      await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
      //DOB field with invalid data
        await page.getByPlaceholder('mm/dd/yyyy').click();
        await page.getByPlaceholder('mm/dd/yyyy').fill('12222019');
        await page.getByRole('button', { name: 'Search' }).click();            
        const noRecord = await page.locator("//h6[normalize-space()='No record found']")
        await expect(noRecord).toBeVisible();


    });


    test('BR-TC-30 to 44', async () => { 

      await page.locator('#wrapper_topbar__1sJJV').getByRole('button').first().click();
      //First Name and Last Name and DOB field with invalid data

        await page.getByLabel('First Name').click();
        await page.getByLabel('First Name').fill('42343rewrwerwe');

        await page.getByLabel('Last Name').click();
        await page.getByLabel('Last Name').fill('42343rewrwerwe');

        await page.getByPlaceholder('mm/dd/yyyy').click();
        await page.getByPlaceholder('mm/dd/yyyy').fill('12222019');

        await page.getByRole('button', { name: 'Search' }).click();            
        const noRecord = await page.locator("//h6[normalize-space()='No record found']")
        await expect(noRecord).toBeVisible();
    });
  });

