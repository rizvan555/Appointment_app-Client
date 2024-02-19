const { faker } = require('@faker-js/faker');

let fakeUsername = faker.internet.userName();
let fakePassword = faker.internet.password();

describe('Faker.js', () => {
  it('Faker.js', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="username"]').should('be.visible').type(fakeUsername);
    cy.get('input[name="password"]').should('be.visible').type(fakePassword);
    cy.get('button[type="submit"]').click();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});
