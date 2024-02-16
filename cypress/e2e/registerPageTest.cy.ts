import { RegisterPage } from '../../cypress/PageObjectModel/registerPage';
const registerPagePOM = new RegisterPage();

it('Test_Register', () => {
  registerPagePOM.navigate();
  registerPagePOM.url();
  registerPagePOM.inputs();
});
