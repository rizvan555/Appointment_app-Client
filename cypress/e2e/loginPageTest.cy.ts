import { slowCypressDown } from 'cypress-slow-down';
import { LoginPage } from '../../cypress/PageObjectModel/loginPage';

const loginPagePOM = new LoginPage();

slowCypressDown();
describe('Test_Login', { testIsolation: false }, () => {
  beforeEach(() => {
    loginPagePOM.navigate();
  });

  it('check_loginPage', () => {
    loginPagePOM.url();
    loginPagePOM.inputs();
  });
});
