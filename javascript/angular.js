/**
 * @file
 * Angular directives and filters.
 */

var base_url = 'http://fb.van-ransbeeck.be/api';
var api_key = '0e6d5ea524fa66cf4f6f8d1b85b253cd';

var headers = {
    headers: {
        'X-AUTH-TOKEN': api_key,
    }
};


angular.module('footbel', [ ])
    // Overview of matches for a division. Optional parameters are logo and specific matchday.
    .directive('matchesOverview', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                division: '@division',
                season: '@season',
                province: '@province',
                logo: '@logo',
                matchday: '@matchday'
            },
            templateUrl: 'matches_overview.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/prov/' + $scope.province + '/' +
                    $scope.season + '/' + $scope.division + '/' + $scope.matchday, headers)
                    .then(function (response) {
                        console.log(response);
                        $scope.matchesPerDay = [];

                        angular.forEach(response.data, function (match) {
                            if (!$scope.matchesPerDay[match.matchday]) {
                                $scope.matchesPerDay[match.matchday] = [];
                            }
                            $scope.matchesPerDay[match.matchday].push(match);
                        });

                        $scope.ready = true;
                    });
            }
        };
    });