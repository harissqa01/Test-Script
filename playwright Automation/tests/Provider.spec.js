// @ts-check
const { test, expect } = require('@playwright/test');

let page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto('https://dev.example.com/');
  await page.getByLabel('Username').fill('drmezerhane');
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

test.describe('DashBorad welcome note', () => {

        test('D-TC-01', async () => {
        await page.waitForSelector("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']");
        await expect(page.getByText('Welcome, Hamza Provider')).toBeVisible();
        await expect(page.getByText('TOTAL')).toBeVisible();
        await expect(page.getByText('Adherence')).toBeVisible();
        const adhenceWidget = page.locator('#adherenceWidget_main__1dXY9').getByRole('button');
        await expect(adhenceWidget).toBeVisible();
        await adhenceWidget.hover();
        await expect(page.getByRole('heading', { name: 'Risk' })).toBeVisible();
        const riskWidget = page.locator('div').filter({ hasText: /^Risk$/ }).getByRole('button')
        await expect(riskWidget).toBeVisible();
        await riskWidget.hover();
        await expect(page.getByRole('heading', { name: 'Monitoring Activity' })).toBeVisible();
        const monitringWidget = page.locator('#monitoringWidget_main__3XFRT').getByRole('button');
        await expect(monitringWidget).toBeVisible()
        await monitringWidget.hover();
      });

      test('Validate the elements of the adherence table', async () => {
        await expect(page.locator(`//div[@id='adherenceWidget_main__1dXY9']//table[@class='table table-sm table-borderless table-striped']`)).toBeVisible();
      
        const adherenceTable = await page.locator(`//div[@id='adherenceWidget_main__1dXY9']//table[@class='table table-sm table-borderless table-striped']`);
        
        const tbody = await adherenceTable.locator('tbody');

        const rowsCount = await tbody.locator("tr").count();

        expect(rowsCount).toBe(3);


        let total = 0;

      for (let i = 0 ; i < rowsCount ; i++){
        const row = tbody.locator("tr").nth(i);
         const val = await row.locator("td").nth(2).textContent(Number);
        console.log("-------------------",val);
         total += Number(val);
      }
      console.log("total number ", total);
      const actualValue = await page.locator("//div/div/h2/a").textContent();
      console.log("--------------",actualValue);
      expect(Number(actualValue)).toBe(total);
      });

      test('Validate the elements of the Risk', async () => {
        await expect(page.locator(`//div[@id='riskWidget_main__1t0qP']//table[@class='table table-sm table-borderless table-striped']`)).toBeVisible();
      
        const adherenceTable = await page.locator(`//div[@id='riskWidget_main__1t0qP']//table[@class='table table-sm table-borderless table-striped']`);
        
        const tbody = await adherenceTable.locator('tbody');

        const rowsCount = await tbody.locator("tr").count();

        expect(rowsCount).toBe(5);


        let total = 0;

      for (let i = 0 ; i < rowsCount ; i++){
        const row = tbody.locator("tr").nth(i);
         const val = await row.locator("td").nth(2).textContent(Number);
        console.log("-------------------",val);
         total += Number(val);
      }
      console.log("total number ", total);
      const actualValue = await page.locator("//div/div/h2/a").textContent();
      console.log("--------------",actualValue);
      expect(Number(actualValue)).toBe(total);
      });


      test('Validate the elements of the Monitoring Activity', async () => {
        await expect(page.locator(`//div[@id='monitoringWidget_main__3XFRT']//div[@class='table-responsive']`)).toBeVisible();
      
        const adherenceTable = await page.locator(`//div[@id='monitoringWidget_main__3XFRT']//div[@class='table-responsive']`);
        
        const tbody = await adherenceTable.locator('tbody');

        const rowsCount = await tbody.locator("tr").count();

        expect(rowsCount).toBe(5);


        let total = 0;

      for (let i = 0 ; i < rowsCount ; i++){
        const row = tbody.locator("tr").nth(i);
         const val = await row.locator("td").nth(2).textContent(Number);
        console.log("-------------------",val);
         total += Number(val);
      }
      console.log("total number ", total);
      const actualValue = await page.locator("//div/div/h2/a").textContent();
      console.log("--------------",actualValue);
      expect(Number(actualValue)).toBe(total);
      });



      // test('validatate sub elements of the main element', async () => {
      //     await page.waitForSelector("//div/div/h2/a");
      //      const online = await page.locator("//div[@class='d-flex justify-content-center align-items-center w-100']//div[1]/h4/a").textContent(Number);
      //      const ofline = await page.locator("//div[@class='d-flex justify-content-center align-items-center w-100']//div[2]/h4/a").textContent(Number);
      //      const newTotal = online + ofline;
      //      console.log(newTotal));
      //      const actualValue = await page.locator("//div/div/h2/a").textContent(Number);
      //      console.log("--------------",actualValue);
      //      expect(Number(actualValue)).toBe(Number(newTotal));


      // })



});