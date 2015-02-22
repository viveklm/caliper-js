/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */


var _ = require('lodash-node');
var http = require('https');
var Q = require('q');
var logger = require('./logger');

/**
 * Represents asynchronous client for the Caliper Sensor. 
 * @constructor AsynchClient
 */
var self = this;

var sensorOptions = {};


/*
 * Check if client is properly initialized
 */
var initialized = function () {
  return true; //TODO 
};


/**
 * Initializes the default client to use.
 * @memberof AsynchClient
 * @function initialize
 * @param  array $options passed straight to the client
 */
self.initialize = function (options) {
  sensorOptions = options;
  logger.log('info', "Initializing sensor with options " + JSON.stringify(options));
};

self.post = function (postOptions, postData) {

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  };

  var postOptions = _.merge(postOptions, {headers: headers});

  var request = http.request(postOptions, function (response) {
    logger.log('debug', "finished sending. Response = " + JSON.stringify(response));
  });

  request.write(postData);
  request.end();

}


/**
 * Send learning events
 * @memberof AsynchClient
 * @function send
 * @param  CaliperEvent $caliperEvent The Caliper Event
 * @return boolean                   whether the measure call succeeded
 */
self.send = function (caliperEvent) {
  if (initialized()) {
    // send event
    logger.log('debug', "Sending event " + JSON.stringify(caliperEvent));

    var postOptions = _.merge(sensorOptions, {
      method: 'POST'
    });

    var postData = JSON.stringify(caliperEvent);

    self.post(postOptions, postData);

  } else {
    logger.log('error', "Sensor is not initialized!!");
  }
};

/**
 * Describe an entity
 * @memberof AsynchClient
 * @function describe
 * @param  CaliperEntity $caliperEntity The Caliper Entity we are describing
 * @return boolean            whether the describe call succeeded
 */
self.describe = function (caliperEntity) {
  if (initialized()) {
    // send describe
    logger.log('debug', "Sending describe " + JSON.stringify(caliperEntity));

    var postOptions = _.merge(sensorOptions, {
      method: 'POST'
    });

    var postData = JSON.stringify(caliperEvent);

    self.post(postOptions, postData);

  } else {
    logger.log('error', "Sensor is not initialized!!");
  }
};

module.exports = {
  initialize: self.initialize,
  send: self.send,
  describe: self.describe
};
