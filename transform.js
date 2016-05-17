'use strict';

var _ = require('underscore');
var moment = require('moment');

module.exports = exports = function(cv) {
  cv.workexperienceinCogniance = _.map(cv.workexperienceinCogniance, function(experience) {
    // making dates to look human friendly
    return _.extend(experience, {
      from2: moment(experience.from2).format('MMMM YYYY'),
      to2: moment(experience.to2).format('MMMM YYYY')
    });
  });
  return cv;
};
