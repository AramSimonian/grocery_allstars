import faker from "faker";
import puppeteer from "puppeteer";
// const APP = "localhost:3000";

const product = {
  name: "bobby",
  barcode: 1234,
};

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto("http://localhost:3000/")
});
afterAll(() => {
  browser.close();
});

describe('Product form', () => {
  test("user can submit a product which will display in list", async () => {
    await page.type("input[name=name]", product.name);
    await page.type("input[name=barcode]", product.barcode);
    await page.click("button[type=submit]");
    expect(page).toContain(product.name);
  })
})
