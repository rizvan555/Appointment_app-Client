describe('Basic visit', () => {
  it.only('How I can use Visit...', () => {
    cy.visit('http://localhost:5173');
    cy.visit('http://localhost:5173/about');
  });

  it('How I can use Title...', () => {
    cy.title().should('eq', 'Wilkommen beim Barbershop');
    cy.title().should('contain', 'Wilkommen');
    cy.title().should('include', 'Wilkommen');
  });

  it('How I can use URL and Location...', () => {
    cy.url().should('eq', 'http://localhost:5173/about');
    cy.url().should('contain', 'about');
    cy.url().should('include', 'localhost');

    cy.location('pathname').should('eq', '/about');
    cy.location('protocol').should('eq', 'http:');
    cy.location('hostname').should('eq', 'http://localhost:5173');
  });

  it('How use GET...', () => {
    cy.get('#button')
      .should('contain', 'Click me')
      .should('be.visible')
      .should('be.enabled')
      .should('have.class', 'btn');

    cy.get('#button').click();
  });
});
