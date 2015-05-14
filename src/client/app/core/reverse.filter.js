(function () {
    'use strict';

    angular.module('app.core')
      .filter('reverse', function() {
        return function(items) {
            return angular.isArray(items) ? items.slice().reverse() : [];
        };
    });
})();
