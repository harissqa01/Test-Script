import { test, expect } from '@playwright/test';




test('Test Single sign on feature', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const page1 = await context.newPage();


  await page.goto('https://dev.example.com/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('teambiller');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Test123$');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByText('Forgot Username or PasswordRemember me').click();
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page1.waitForTimeout(1000);

  try{
    await page1.getByText('Yes').click();
  }catch(error){
    console.log("there is no dialodbox");
  }




  await page.waitForSelector("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']");
  await expect(page.locator("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']")).toBeVisible();


  await page1.goto('https://dev.example.com/login');
  await page1.getByLabel('Username').click();
  await page1.getByLabel('Username').fill('teambiller');
  await page1.getByLabel('Password').click();
  await page1.getByLabel('Password').fill('Test123$');
  await page1.getByRole('button', { name: 'LOGIN' }).click();
  await page1.getByLabel('Username').click();
  await page1.getByRole('button', { name: 'LOGIN' }).click();
  await page1.waitForTimeout(1000);
  try{
    await page1.getByText('Yes').click();
  }catch(error){
    console.log("there is no dialodbox");
  }

  await page.waitForSelector("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']");
  await expect(page.locator("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']")).toBeVisible();});
  