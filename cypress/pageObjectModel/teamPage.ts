export class TeamPage {
  navigate() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/team');
  }

  url() {
    cy.url().should('eq', 'http://localhost:5173/team');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', 'team');
  }

  team() {
    cy.get('.team_list').should('be.visible');
    cy.get('.team_list img').should('be.visible');
    cy.get('.team_list h1').should('be.visible');
    cy.get('.team_list h5').should('be.visible');

    cy.get('.team_list').should('have.length', 1);
  }
}
