import { TerminPage } from '../../cypress/PageObjectModel/terminPage';
const terminPagePOM = new TerminPage();

describe('Test_termin', () => {
  beforeEach(() => {
    terminPagePOM.navigateLogin();
  });
  it('check_termin', () => {
    terminPagePOM.inputs();
    terminPagePOM.navigateTermin();
    terminPagePOM.url();
    terminPagePOM.service();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});
