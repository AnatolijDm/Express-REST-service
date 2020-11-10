const { connectToDBmongo } = require('./common/BDmongo');
const { PORT } = require('./common/config');
const app = require('./app');

/* app.listen(PORT, () => {
  userRepo.saveAdminUser(DEFAULT_USER_ADMIN);
  console.log(`App is running on http://localhost:${PORT}`);
});*/

connectToDBmongo(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
