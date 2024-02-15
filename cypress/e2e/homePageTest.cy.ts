describe('Test_click_to_service', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('check_homePage', () => {
    cy.url().should('eq', 'http://localhost:5173/');
    cy.url().should('contain', 'localhost');
    cy.url().should('include', '5173');

    cy.location('pathname').should('eq', '/');

    cy.get('.home-bg aside h1')
      .should('contain', 'Wilkommen beim Barbershop')
      .should('be.visible');
    cy.get('.home-bg aside h1').should('have.length', 1);
    cy.get('.home-bg aside h1').its('length').and('eq', 1);
    cy.get('.home-bg button a').should('have.attr', 'href', '/about');


  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error')) {
      return false;
    }
    return true;
  });
});
