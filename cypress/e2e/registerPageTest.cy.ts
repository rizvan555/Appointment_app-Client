import { slowCypressDown } from 'cypress-slow-down';
import { RegisterPage } from '../../cypress/PageObjectModel/registerPage';

const registerPagePOM = new RegisterPage();

slowCypressDown();
describe('Test_Register', () => {
  beforeEach(() => {
    registerPagePOM.navigate();
  });
  it('Test_Register', () => {
    registerPagePOM.url();
    registerPagePOM.inputs();
  });
});
