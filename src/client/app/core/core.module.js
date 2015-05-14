(function () {
    'use strict';

    angular
        .module('app.core', [
            'firebase.utils',
            'ngAnimate', 'ngSanitize',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus'
        ]);
})();
