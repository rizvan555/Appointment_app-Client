export class RegisterPage {
  navigate() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/register');
  }

  url() {
    cy.url().should('eq', 'http://localhost:5173/register');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', 'register');
  }

  inputs() {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="phone"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.get('input[name="username"]').type('rizvannn');
    cy.get('input[name="email"]').type('rizvan@rizvan.de');
    cy.get('input[name="phone"]').type('004915151400004');
    cy.get('input[name="password"]').type('111111');
    cy.get('button[type="submit"]').click();
  }
}

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});
