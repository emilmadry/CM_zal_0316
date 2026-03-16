import { expect } from '@playwright/test';

export class Login {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByTestId('login-username');
        this.passwordInput = page.getByTestId('login-password');
        this.loginButton = page.getByTestId('login-button');
        this.welcomeMsg = page.getByTestId('welcome-msg');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectWelcomeMessage(username) {
        await expect(this.welcomeMsg).toHaveText(`Witaj: ${username}`);
    }


}

module.exports = { Login };