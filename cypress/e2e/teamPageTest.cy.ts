import { TeamPage } from '../../cypress/PageObjectModel/teamPage';
const teamPagePOM = new TeamPage();

describe('test_teams', () => {
  it('check_teams', () => {
    teamPagePOM.navigate();
    teamPagePOM.url();
    teamPagePOM.team();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});
