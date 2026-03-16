import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = 'Testowy Sklep – Strona główna';
        this.headingLocator = this.page.getByRole('heading');
    }

    async gotoByProductId(productId) {
        await this.page.goto(`products/p${productId}.html`);
    }

    async clickProductCard(productId) {
        await this.page.getByTestId(`product-title-${productId}`).click();
    }

    async checkProductTitleById(productId, expectedTitle) {
        await expect(this.page.getByTestId(`product-title-${productId}`)).toContainText(expectedTitle);
    }

    async checkHeadingContainsProductName(productName) {
        await expect(this.headingLocator).toContainText(productName);
    }

    async clickBuyButton(productId) {
        await this.page.getByTestId(`buy-btn-${productId}`).click();
    }

}

module.exports = { ProductPage };