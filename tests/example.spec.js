// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { ProductPage } from '../pages/product';
import { Cart } from '../pages/cart';


const allProducts = [
  { id: 1, name: 'Miecz Runiczny', price: 199 },
  { id: 2, name: 'Eliksir Energii', price: 39 },
  { id: 3, name: 'Peleryna Maskująca', price: 349 },
  { id: 4, name: 'Mysz Gamingowa', price: 129 },
  { id: 5, name: 'Klawiatura Mechaniczna', price: 289 },
  { id: 6, name: 'Słuchawki Studyjne', price: 459 },
  { id: 7, name: 'Notes QA', price: 24 },
  { id: 8, name: 'Kubek Debuggera', price: 49 }
];

allProducts.forEach(product => {
  test(`should display correct title for product name ${product.name}`, async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cart = new Cart(page);

    const testedProduct = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    await homePage.goto();

    await expect(page).toHaveTitle(homePage.pageTitle);

    await homePage.checkProductTitleById(testedProduct.id, testedProduct.name);
    await homePage.clickProductCard(testedProduct.id);

    await productPage.checkHeadingContainsProductName(testedProduct.name);
    await productPage.clickBuyButton(testedProduct.id);

    await cart.expandCart();
    await cart.checkForProductInCart(testedProduct.name, testedProduct.id);

    await cart.clickBuyButton();
    await expect(cart.successToast.filter({ hasText: cart.successMessage })).toBeVisible();

  });
});



test('full e2e path', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cart = new Cart(page);

  const testedProduct = {
    id: 3,
    name: 'Peleryna Maskująca',
    price: 349,
  };

  await homePage.goto();

  await expect(page).toHaveTitle(homePage.pageTitle);

  await homePage.checkProductTitleById(testedProduct.id, testedProduct.name);
  await homePage.clickProductCard(testedProduct.id);

  await productPage.checkHeadingContainsProductName(testedProduct.name);
  await productPage.clickBuyButton(testedProduct.id);

  await cart.expandCart();
  await cart.checkForProductInCart(testedProduct.name, testedProduct.id);

  await cart.clickBuyButton();
  await expect(cart.successToast.filter({ hasText: cart.successMessage })).toBeVisible();

});

