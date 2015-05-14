/* jshint -W106 */
(function() {
    'use strict';

    angular
        .module('app.poll')
        .directive('demoPollChoice', fn);

    /* @ngInject */
    function fn() {

        PollChoice.$inject = ['$scope', '$rootScope', 'fbutil', '$window', 'Firebase'];

        var directive = {
            restrict: 'AE',
            templateUrl: 'app/poll/poll.choice.tpl.html',
            controller: PollChoice,
            controllerAs: 'vm',
        };
        return directive;
    }

    function PollChoice($scope, $rootScope, fbutil, $window, Firebase) {
        var vm = this;
        // var ref = new Firebase('https://techmeetup-demo.firebaseio.com');
        var ref = fbutil.ref('/');

        vm.name = $scope.choice.name;
        vm.slug = $scope.choice.$id;
        vm.toggle = toggle;
        vm.user = $rootScope.user;

        function toggle() {
            var me = ref.getAuth();
            if (me === null) {
                $window.alert('You need to login to choose');
                return;
            }
            var myInfo = getUserInfo();

            console.log('choice:' + vm.slug);

            var mychoice = ref
                .child('choices')
                .child(vm.slug)
                .child('people')
                .child(me.uid);
            mychoice.once('value', function(data) {
                if (data.val() === null) {
                    console.log('setting choice: ' + vm.slug + ' : ' + me.uid);
                    console.log(myInfo);
                    mychoice.set(myInfo);
                } else {
                    console.log('removing choice: ' + vm.slug + ' : ' + me.uid);
                    mychoice.remove();
                }
                // console.log(vm.slug + ' toggled ' + me.uid);
            });
            $scope.$watch('mychoice', function(newv, oldv) {
                var thischoice = ref.child('choices').child(vm.slug);
                var people = thischoice.child('people');
                people.once('value', function(data) {
                    var snapshot = data.val();
                    var count = 0;
                    /* jshint -W089 */
                    for (var i in snapshot) {
                        count += 1;
                    }
                    thischoice.child('count').set(count);
                    console.log(vm.slug + ' count ' + count);
                });
            });
        }

        function getUserInfo() {
            var authData = ref.getAuth();
            var info = {};
            if (authData !== null) {
                // var imageUrl = getImageUrl(authData);
                info = {
                    provider: authData.auth.provider,
                    displayName: getDisplayName(authData),
                    userName: getUserName(authData),
                    imageUrl: getImageUrl(authData),
                };
            }
            return info;
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
