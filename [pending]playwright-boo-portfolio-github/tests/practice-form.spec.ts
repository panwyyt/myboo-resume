import { test, expect } from '@playwright/test';
test('Practice-Form', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Boo');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Boo');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('boo@gmail.com');
  await page.getByRole('radio', { name: 'Other' }).check();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('0988889999');
  //ปฏิทิน
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('combobox').nth(1).selectOption('2000');
  await page.getByRole('combobox').nth(0).selectOption('0');
  await page.getByRole('gridcell', { name: /January 1st, 2000/ }).click();
  await expect(page.locator('#dateOfBirthInput')).toHaveValue('01 Jan 2000');
  //จบปฏิทิน
  //await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('e');
  await page.getByRole('option', { name: 'English' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.getByRole('checkbox', { name: 'Sports' }).check();
  await page.getByRole('checkbox', { name: 'Music' }).check();
//   await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('/Users/tocilic/Documents/playwright-boo-portfolio-github/others/img-for-test.png');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('address test');
  await page.locator('#state > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg').click();
  await page.getByRole('option', { name: 'NCR' }).click();
  await page.locator('#city > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg').click();
  await page.getByRole('option', { name: 'Delhi' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
});