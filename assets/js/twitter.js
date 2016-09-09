/**
 * @file
 * Angular directive for a twitter feed.
 */

angular.module('twitterfeed', [])
    .directive('twitterFeed', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'twitter.tpl.html',
            link: function ($scope, element) { },
            controller: function ($scope, $timeout) {

                function fetchData() {
                    $scope.ready = false;
                    $scope.rankings = [];

                    $http.get('get_tweets.php')
                        .then(function (response) {
                            $scope.tweets = response.data;
                            $scope.ready = true;
                        });

                    // Fetch tweets every 5 minutes.
                    $timeout(fetchData, 5 * 60 * 1000);
                }

                fetchData();
            }
        };
    });