const path = require('path');

const rootPath = path.normalize(`${__dirname}/../../..`);

const directory = {
  root: rootPath,
  distDir: `${rootPath}/dist`,
  assetsDir: `${rootPath}/public`,
  reactAppDir: `${rootPath}/react-app/dist`,
};

export default directory;
