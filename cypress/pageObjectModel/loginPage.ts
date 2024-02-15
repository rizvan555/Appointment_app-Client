export class LoginPage {
  navigate() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/login');
  }

  url() {
    cy.url().should('eq', 'http://localhost:5173/login');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', 'login');
  }

  inputs() {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="username"]').type('fateh');
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
