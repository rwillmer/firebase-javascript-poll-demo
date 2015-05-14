(function() {
    'use strict';

    angular
        .module('app.poll')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'poll',
                config: {
                    // url: '/poll',
                    url: '/',
                    templateUrl: 'app/poll/poll.html',
                    controller: 'PollController',
                    controllerAs: 'vm',
                    title: 'Poll',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Poll'
                    }
                }
            },
        ];
    }
})();
