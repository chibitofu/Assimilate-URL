'use strict';
module.exports = function(sequelize, DataTypes) {
  var url = sequelize.define('url', {
    full_url: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return url;
};
