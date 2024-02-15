import { HomePage } from '../../cypress/pageObjectModel/homepage';
const homePagePom = new HomePage();

describe('Test_click_to_service', () => {
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
