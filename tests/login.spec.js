// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { Login } from '../pages/login';

test('login as admin', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new Login(page);

    const testedUser = {
        username: process.env.ADMIN_LOGIN,
        password: process.env.ADMIN_PASSWORD
    };

    await homePage.goto();

    await loginPage.login(testedUser.username, testedUser.password);

    await loginPage.expectWelcomeMessage(testedUser.username);
});

test('login as user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new Login(page);

    const testedUser = {
        username: process.env.USER_LOGIN,
        password: process.env.USER_PASSWORD
    };

    await homePage.goto();

    await loginPage.login(testedUser.username, testedUser.password);

    await loginPage.expectWelcomeMessage(testedUser.username);
});


