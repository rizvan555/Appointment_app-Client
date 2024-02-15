import { RegisterPage } from '../../cypress/pageObjectModel/registerPage';
const registerPagePOM = new RegisterPage();

it('Test_Register', () => {
  registerPagePOM.navigate();
  registerPagePOM.url();
  registerPagePOM.inputs();
});
