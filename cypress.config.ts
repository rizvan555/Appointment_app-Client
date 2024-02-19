import { defineConfig } from 'cypress';
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //baseUrl: 'http://localhost:5173',
      on('task', { downloadFile });
    },
  },
});
