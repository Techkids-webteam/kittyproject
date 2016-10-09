var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';


var config = {
  development: {
    root: rootPath,
    app: {
      name: 'kitty-project'
    },
    port: process.env.PORT || 8080,
    db: 'mongodb://admin:admin@ds019254.mlab.com:19254/hackathon'
  },

  test: {
    root: rootPath,
    app: {
      name: 'kitty-project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://admin:admin@ds019254.mlab.com:19254/hackathon'
  },

  production: {
    root: rootPath,
    app: {
      name: 'kitty-project'
    },
    port: process.env.PORT || 80,
    db: 'mongodb://admin:admin@ds019254.mlab.com:19254/hackathon'
  }
};

module.exports = config[env];
