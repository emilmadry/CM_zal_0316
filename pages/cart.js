import { expect } from '@playwright/test';

export class Cart {
    constructor(page) {
        this.page = page;
        this.expandCartButton = this.page.getByTestId('cart-button');
        this.cartList = this.page.getByTestId('cart-list');
        this.cartBuyButton = this.page.getByTestId('cart-buy');
        this.successToast = this.page.locator('.toast-success');
        this.successMessage = 'sukces';
    }

    async expandCart() {
        await this.expandCartButton.click();
        await expect(this.cartList).toBeVisible();
    }

    async checkForProductInCart(productName, productId) {
        await expect(this.cartList.locator('span')).toContainText(`${productName} (p${productId})`);
    }

    async clickBuyButton() {
        await this.cartBuyButton.click();

    }



}

module.exports = { Cart };