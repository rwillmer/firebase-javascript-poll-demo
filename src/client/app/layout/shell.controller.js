(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$timeout', 'config', 'logger'];
    /* @ngInject */
    function ShellController($timeout, config, logger) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by Rachel Willmer',
            link: 'http://twitter.com/rwillmer'
        };

        activate();

        function activate() {
            // logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();
