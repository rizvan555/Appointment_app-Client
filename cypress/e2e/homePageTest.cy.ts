describe('Test_click_to_service', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/');
  });

  it('check_url', () => {
    cy.url().should('eq', 'http://localhost:5173/');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', '5173');
  });

  it('check_location', () => {
    cy.location('pathname').should('eq', '/');
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});
