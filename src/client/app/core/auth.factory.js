(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$firebaseAuth', 'fbutil'];
    /* @ngInject */
    function Auth($firebaseAuth, fbutil) {
        var ref = fbutil.ref('/');
        return $firebaseAuth(ref);
    }
}) ();
