(function () {
    'use strict';

    angular
        .module('app.poll')
        .controller('PollController', PollController);

    PollController.$inject = ['logger', 'fbutil',
        'Firebase', 'Auth', '$http', '$scope', '$rootScope'];
    /* @ngInject */
    function PollController(logger, fbutil, Firebase, Auth, $http, $scope, $rootScope) {
        var vm = this;
        vm.auth = Auth;
        vm.auth.$onAuth(function(authData) {
            // debugger;
            vm.authData = authData;
            if (authData) {
                saveProfile();
            }
        });

        var ref = fbutil.ref('/');

        vm.title = 'Poll';
        vm.loginWith = loginWith;
        vm.logout = logout;

        // loadOptions();
        loadChoices();

        function saveProfile() {
            var userref = ref.child('users').child(vm.authData.auth.uid);
            userref.once('value', function(data) {
                vm.user = data.val();
                if (vm.user !== null) {
                    return;
                }

                // save new profile

                var imageUrl = getImageUrl(vm.authData);
                console.log('imageUrl:' + imageUrl);
                $rootScope.user = {
                    provider: vm.authData.auth.provider,
                    displayName: getDisplayName(vm.authData),
                    userName: getUserName(vm.authData),
                    imageUrl: imageUrl,
                };
                userref.set($rootScope.user);
            });
        }

        function loadChoices() {
            vm.choices = fbutil.syncArray(
                '/choices',
                {'orderByChild': 'count'}
            );
        }

        function loginWith(service) {
            if (service === 'twitter') {
                return loginWithTwitter();
            } else {
                console.log('Unknown service: ' + service);
            }
        }

        function logout() {
            // debugger
            ref.unauth();
            // $rootScope.user = null;
        }

        function loginWithTwitter() {
            // debugger;

            ref.authWithOAuthRedirect('twitter', function(error) {
                if (error) {
                    console.log('Login Failed!', error);
                } else {
                    /* jshint -W035 */
                    // We'll never get here, as the page will redirect on success.
                }
            });
        }

        // find a suitable name based on the meta info given by each provider
        function getDisplayName(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
            }
        }

        // find a suitable name based on the meta info given by each provider
        function getUserName(authData) {
            switch (authData.provider) {
                // case 'password':
                //   return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.username;
                // case 'facebook':
                //   return authData.facebook.displayName;
            }
        }

        // find a suitable image based on the meta info given by each provider
        function getImageUrl(authData) {
            switch (authData.provider) {
                // case 'password':
                //   return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    /* jshint -W106 */
                    return authData.twitter.cachedUserProfile.profile_image_url;
                // case 'facebook':
                //   return authData.facebook.displayName;
            }
        }
    }
})();
