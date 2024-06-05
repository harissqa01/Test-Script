const {test, expect, chromium}= require('@playwright/test')
test("login", async function({page}){

})

test("LG-TC-01", async function({page}){
await page.goto("https://dev.example.com/")
await page.getByLabel('Username').fill('harisp')
await page.getByLabel('Password').fill('Test002@')
await page.getByLabel('Username').click()
await page.getByRole('button', { name: 'LOGIN' }).click();
await page.waitForTimeout(10000);  
await expect(page.locator('//h1[@class="MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x"]')).toContainText('Welcome, Haris Provider');
 

})

test("LG-TC-02", async function({page}){
    await page.goto("https://dev.example.com/")
    await page.getByLabel('Username').fill('harisp')
    await page.getByLabel('Password').fill('Test002@')
    await page.getByLabel('Username').click()
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.waitForTimeout(15000);  
    await expect(page.locator('//h1[@class="MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x"]')).toContainText('Welcome, Haris Provider');
    
   
    
  const newPage = await page.context().newPage();
await newPage.goto("https://dev.example.com/") 
await newPage.waitForTimeout(5000)
await newPage.getByLabel('Username').fill('harisp')
await newPage.getByLabel('Password').fill('Test002@')
    })



test("OneLoginSession", async function (){
const browser= await chromium.launch()
const context = await browser.newContext()
const page1 = await context.newPage()
const page2 = await context.newPage()
await page1.goto("https://dev.example.com/")
await page1.getByLabel('Username').fill('harisp')
await page1.getByLabel('Password').fill('Test002@')
await page1.getByLabel('Username').click()
await page1.getByRole('button', { name: 'LOGIN' }).click();
await page1.waitForSelector("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']");
await expect(page1.locator('//h1[@class="MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x"]')).toContainText('Welcome, Haris ');

await page2.goto("https://dev.example.com/")
await page2.getByLabel('Username').fill('harisp')
await page2.getByLabel('Password').fill('Test002@')
await page2.getByLabel('Username').click()
//  await page2.waitForSelector('//p[@id="alert-dialog-slide-description"]');
try{
    await page2.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page2.locator('//p[@id="alert-dialog-slide-description"]')).toBeVisible();
await page2.locator("//button[normalize-space()='Yes']").click();
}
catch(error){
console.log("pop is not visible ")
}
await page2.waitForSelector("//h1[@class='MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x']");
await expect(page2.locator('//h1[@class="MuiTypography-root MuiTypography-h1 MuiTypography-gutterBottom css-82ed4x"]')).toContainText('Welcome, Haris Provider');
//check on forst page that user is logged out or not
await page1.waitForTimeout(3000)
await expect(page1.getByLabel('Username')).toBeVisible();
console.log("first tab user is log out")

    });