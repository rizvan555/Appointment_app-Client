export class TerminPage {
  navigate() {
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
