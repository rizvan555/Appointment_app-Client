describe('Test_click_to_service', () => {
  beforeEach(() => {
    cy.viewport(1200, 100);
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

    //buttona basdiqda "about" sehifesine kec
    cy.get('.home-bg button a').should('have.attr', 'href', '/about');

    //buttona basdiqda "about" sehifesine kec,2 saniye gözle ve geri qayit ve sonra yeniden about sehifesine kec
    cy.get('.home-bg button a').click();
    cy.url().should('eq', 'http://localhost:5173/about');
    cy.wait(2000);
    cy.go('back');
    cy.wait(2000);
    cy.go('forward');
    //***********************************************************/
    cy.wait(2000);
    cy.go(-1); //"back"-i belece -1 ile de yaza bilerik
    cy.wait(2000);
    cy.go(1); //"forward"-i belece 1 ile de yaza bilerik
  });

  

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error')) {
      return false;
    }
    return true;
  });
});
