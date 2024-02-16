import { ProfilePage } from '../../cypress/PageObjectModel/profilePage';
const profilePagePom = new ProfilePage();

describe('Test_profilePage', () => {
  beforeEach(() => {
    profilePagePom.navigateLogin();
  });

  it('test_profile', () => {
    profilePagePom.inputs();

    profilePagePom.navigateProfile();
    profilePagePom.url();
    profilePagePom.profile();
  });
});
