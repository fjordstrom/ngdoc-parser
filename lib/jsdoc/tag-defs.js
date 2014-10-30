'use strict';

var extractTypeTransform = require('../transforms/extract-type');
var extractNameTransform = require('../transforms/extract-name');

module.exports = {

  //jsdoc,
  module: {},
  name: {},
  methodOf: {},
  eventOf: {},
  eventType: {},
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
    docProperty: 'returns',
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
    'return': {
        isMultiLine: true,
        docProperty: 'returns',
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

      name = name.name;


      var obj = {
        type: type,
        description: str
      };

      if(typeof(name) === "string") {
          if (name.indexOf('@') === 0) {
              obj.binding = 'oneWay';
          } else if (name.indexOf('=') === 0) {
              obj.binding = 'twoWay';
          } else if (name.indexOf('&') === 0) {
              obj.binding = 'reference';
          }


          if(obj.binding) {
              name = name.substr(1);
          }
          obj.name = name;
      } else {
          throw "Parameter name not specified!";
      }
      return obj;
    }
  },

  // ngDoc
  ngdoc: {},
  restrict: {},
  element: {},
  scope: {},
  priority: {},
  animations: {},

    require: {
        enableMultiTag: true,
        isMultiLine: true,
        docProperty: 'require',
        parse: function (str) {
            str = str.trim();
            var index = str.indexOf(' ');
            var name;
            var obj = {}
            if (index < 0)  {
                name = str;
                obj.description = "";
            }
            else {
                name = str.substr(0, index);
                obj.description = str.substr(index);
            }
            var searchOnlyInParents = false;
            if(name.indexOf('^') == 0) {
                name = name.substr(1);
                searchOnlyInParents = true;
            }


            obj.name = name;




            if (searchOnlyInParents) {
                obj.searchOnlyInParents = searchOnlyInParents;
            }
            return obj
        }
    },

    requires: {
        enableMultiTag: true,
        isMultiLine: true,
        docProperty: 'require',
        parse: function (str) {
            str = str.trim();
            var index = str.indexOf(' ');
            var name;
            var obj = {}
            if (index < 0)  {
                name = str;
                obj.description = "";
            }
            else {
                name = str.substr(0, index);
                obj.description = str.substr(index);
            }
            var searchOnlyInParents = false;
            if(name.indexOf('^') == 0) {
                name = name.substr(1);
                searchOnlyInParents = true;
            }


            obj.name = name;




            if (searchOnlyInParents) {
                obj.searchOnlyInParents = searchOnlyInParents;
            }
            return obj
        }
    }


};
