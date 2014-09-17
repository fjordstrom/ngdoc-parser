'use strict';

var extractTypeTransform = require('../transforms/extract-type');
var extractNameTransform = require('../transforms/extract-name');

module.exports = {

  //jsdoc,
  module: {},
  name: {},
  methodOf: {},
  description: {isMultiLine: true},
  example: {isMultiLine: true},

  property: {
    enableMultiTag: true,
    isMultiLine: true,
    docProperty: 'properties',
    parse: function (str) {

      // TODO use a cleaner solution
      /**
       * @type {typeExtractionResult}
       */
      var type = extractTypeTransform(str);
      str = type.next;
      delete type.next;

      /**
       * @type {nameExtractionResult}
       */
      var name = extractNameTransform(str);
      str = name.next;
      delete name.next;

      return {
        type: type,
        name: name,
        description: str
      };
    }
  },


  returns: {
    isMultiLine: true,
    docProperty: 'return',
    parse: function (str) {

      // TODO use a cleaner solution
      /**
       * @type {typeExtractionResult}
       */
      var type = extractTypeTransform(str);
      str = type.next;
      delete type.next;

      return {
        type: type,
        description: str
      }
    }
  },
  param: {
    enableMultiTag: true,
    isMultiLine: true,
    docProperty: 'params',
    parse: function (str) {

      // TODO use a cleaner solution
      /**
       * @type {typeExtractionResult}
       */
      var type = extractTypeTransform(str);
      str = type.next;
      delete type.next;

      /**
       * @type {nameExtractionResult}
       */
      var name = extractNameTransform(str);
      str = name.next;
      delete name.next;

      return {
        type: type,
        name: name,
        description: str
      };
    }
  },

  // ngDoc
  ngdoc: {},
  restrict: {},
  element: {},
  scope: {},
  priority: {},
  animations: {}

};
