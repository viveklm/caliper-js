/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var moment = require('moment');
var test = require('tape');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var FillinBlankResponse = require('../../src/entities/response/fillinBlankResponse');
var Person = require('../../src/entities/agent/person');

var jsonCompare = require('../testUtils');

test('Create a FillinBlankResponse entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
  const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1";

  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));
  var assessment = entityFactory().create(Assessment, BASE_ASSESS_IRI);
  var assessmentItem = entityFactory().create(AssessmentItem, BASE_ITEM_IRI, {
    isPartOf: assessment
  });

  var attempt = entityFactory().create(Attempt, BASE_ITEM_IRI.concat("/users/554433/attempts/1"), {
    actor: actor,
    assignable: assessmentItem,
    count: 1,
    startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
    endedAtTime: moment.utc("2016-11-15T10:15:12.000Z")
  });

  var response = entityFactory().create(FillinBlankResponse, BASE_ITEM_IRI.concat("/users/554433/responses/1"), {
    attempt: attempt,
    values: [ "data interoperability", "semantic interoperability" ],
    dateCreated: moment.utc("2016-11-15T10:15:12.000Z"),
    startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
    endedAtTime: moment.utc("2016-11-15T10:15:12.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityFillinBlankResponse', response, t);
});