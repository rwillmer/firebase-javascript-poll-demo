(function () {
    'use strict';

    angular.module('firebase.utils', ['firebase', 'firebase.config'])
        .factory('fbutil', fbutilFactory);

    fbutilFactory.$inject = ['$window', 'FBURL', '$firebaseObject', '$firebaseArray'];
    /* @ngInject */
    function fbutilFactory ($window, FBURL, $firebaseObject, $firebaseArray) {

        return {
            syncArray: function(path, factoryConfig) { // jshint ignore:line
                return syncDataArray.apply(null, arguments);
            },

            ref: firebaseRef
        };

        function pathRef(args) {
            for (var i = 0; i < args.length; i++) {
                if (angular.isArray(args[i])) {
                    args[i] = pathRef(args[i]);
                } else if (typeof args[i] !== 'string') {
                    throw new Error(
                        'Argument ' + i + ' to firebaseRef is not a string: ' + args[i]);
                }
            }
            return args.join('/');
        }

        /**
         * Example:
         * <code>
         *    function(firebaseRef) {
         *       var ref = firebaseRef('path/to/data');
         *    }
         * </code>
         *
         * @function
         * @name firebaseRef
         * @param {String|Array...} path relative path to the root folder in Firebase instance
         * @return a Firebase instance
         */
        function firebaseRef(path) { // jshint ignore:line
            var ref = new $window.Firebase(FBURL);
            var args = Array.prototype.slice.call(arguments);
            if (args.length) {
                ref = ref.child(pathRef(args));
            }
            return ref;
        }

        function syncDataObject(path, props) {
            var ref = firebaseRef(path);
            props = angular.extend({}, props);
            angular.forEach(['limitToFirst', 'limitToLast', 'orderByKey',
                'orderByChild', 'orderByPriority', 'startAt', 'endAt'
            ], function(k) {
                if (props.hasOwnProperty(k)) {
                    var v = props[k];
                    ref = ref[k].apply(ref, angular.isArray(v) ? v : [v]);
                    delete props[k];
                }
            });
            return $firebaseObject(ref, props);
        }

        function syncDataArray(path, props) {
            var ref = firebaseRef(path);
            props = angular.extend({}, props);
            angular.forEach(['limitToFirst', 'limitToLast', 'orderByKey',
                'orderByChild', 'orderByPriority', 'startAt', 'endAt'
            ], function(k) {
                if (props.hasOwnProperty(k)) {
                    var v = props[k];
                    ref = ref[k].apply(ref, angular.isArray(v) ? v : [v]);
                    delete props[k];
                }
            });
            return $firebaseArray(ref, props);
        }
    }
})();
