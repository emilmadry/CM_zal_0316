// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { ProductPage } from '../pages/product';
import { Cart } from '../pages/cart';


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

