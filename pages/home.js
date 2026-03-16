import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.pageTitle = 'Testowy Sklep – Strona główna';
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickProductCard(productId) {
        await this.page.getByTestId(`product-title-${productId}`).click();
    }

    async checkProductTitleById(productId, expectedTitle) {
        await expect(this.page.getByTestId(`product-title-${productId}`)).toContainText(expectedTitle);
    }
}

module.exports = { HomePage };