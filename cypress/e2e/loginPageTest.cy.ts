import { LoginPage } from '../../cypress/PageObjectModel/loginPage';
const loginPagePOM = new LoginPage();

describe('Test_Login', () => {
  beforeEach(() => {
    loginPagePOM.navigate();
  });

  it('check_loginPage', () => {
    loginPagePOM.url();
    loginPagePOM.inputs();
  });
});
