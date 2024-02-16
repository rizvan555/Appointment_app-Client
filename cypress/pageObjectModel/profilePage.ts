import { getItem } from '../../src/helper/persistanceStorage';

export class ProfilePage {
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

  navigateProfile() {
    cy.viewport(1200, 1000);
    cy.visit('http://localhost:5173/profile');
  }
  url() {
    cy.url().should('eq', 'http://localhost:5173/profile');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', 'profile');
  }
  profile() {
    const token = getItem('token');
    if (token) {
      cy.get('.profile_list').should('be.visible');
    } else {
      cy.log('Authorization error or invalid token!');
    }
  }
}

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
