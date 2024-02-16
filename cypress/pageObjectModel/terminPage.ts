export class TerminPage {
  navigateLogin() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/login');
  }
  inputs() {
    cy.wait(1000);
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="username"]').type('fateh');
    cy.get('input[name="password"]').type('111111');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  }

  navigateTermin() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/termin');
  }
  url() {
    cy.url().should('eq', 'http://localhost:5173/termin');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', 'termin');
  }
  service() {
    cy.get('.service_component').should('be.visible');
    cy.get('.service_component').should('have.length', 1);
  }
}
