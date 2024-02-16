import { HomePage } from '../../cypress/PageObjectModel/homepage';
const homePagePom = new HomePage();

describe('Test_homePage', () => {
  beforeEach(() => {
    homePagePom.navigate();
  });

  it('check_homePage', () => {
    homePagePom.url();
    homePagePom.location();
    homePagePom.visible();
    homePagePom.href();
    homePagePom.forward_back();

  
  });
});
