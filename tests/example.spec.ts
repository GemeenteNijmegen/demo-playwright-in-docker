import { test, expect } from '@playwright/test';
import * as getInvalidRequest from './data/get-invalid';
import * as getLoginRequest from './data/get-loggedin';
import { mockDynamoDbSession } from './util';

test('test lambda', async ({ request }) => {
  const response = await request.post('http://lambda:8080/2015-03-31/functions/function/invocations', {
    data: getInvalidRequest,
  });
  
  const json = await response.json()
  expect(response.ok()).toBeTruthy();
  expect(json.statusCode).toBe(302);
  expect(json.headers.Location).toBe('/login');
});


test('successful login', async ({request}) => {
  await mockDynamoDbSession();



  const response = await request.post('http://lambda:8080/2015-03-31/functions/function/invocations', {
    data: getLoginRequest.default,
  });

  const json = await response.json()
  console.log(JSON.stringify(json, null, 2));
  expect(response.ok()).toBeTruthy();
  expect(json.statusCode).toBe(200);
  
})
