// @ts-check
import { test, expect } from '@playwright/test';

test('test get product', async ({ request }) => {
    const response = await request.get('/api/index.php?endpoint=products&id=7',
    );

    const responseBody = await response.text();

    expect(response.status()).toBe(200);
    expect(responseBody).toContain('{\"id\":7,\"name\":\"Notes QA\",\"price\":24.99,\"currency\":\"PLN\",\"display_price\":\"24.99 zł\"}');
})

test('test post product endpoint', async ({ request }) => {
    const response = await request.post('/api/index.php?endpoint=products', {
        data: {
            "name": "Random item",
            "price": 123.45,
            "currency": "PLN"
        }

    });

    const responseBody = await response.text();

    expect(response.status()).toBe(201);
    expect(responseBody).toContain('"created (mock)","product":{"name":"Random item","price":123.45,"currency":"PLN","id":');


});