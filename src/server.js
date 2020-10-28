const { connectToDBmongo } = require('./common/BDmongo');
const { PORT } = require('./common/config');
const app = require('./app');

connectToDBmongo(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
