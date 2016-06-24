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

angular.module( 'footbel', [] )
    // General ranking for a complete division.
    .directive('ranking', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                division: '@division',
                season: '@season',
                province: '@province',
                teamname: '@teamname'
            },
            templateUrl: 'ranking.tpl.html',
            link: function ($scope, element) {},
            controller: function ($scope) {
                $scope.ready = false;
                $scope.rankings = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/ranking/prov/' + $scope.province + '/' +
                    $scope.season + '/' + $scope.division, headers)
                    .then(function (response) {
                        $scope.rankings = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Short ranking with [teamname] highlighted and [number]/2 teams above and below the highlighted team.
    .directive('rankingShort', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                division: '@division',
                season: '@season',
                province: '@province',
                teamname: '@teamname',
                number: '@number'
            },
            templateUrl: 'ranking_short.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.rankings = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/ranking/short/prov/' + $scope.province + '/' +
                    $scope.season + '/' + $scope.division + '/' + $scope.teamname +
                    '/' + $scope.number, headers)
                    .then(function (response) {
                        $scope.rankings = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

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
            link: function ($scope, element) {},
            controller: function ($scope, $timeout) {

                function fetchData() {
                    $scope.ready = false;
                    $scope.matches = [];

                    $scope.base_url = base_url;

                    $http.get(
                        base_url + '/matches/prov/' + $scope.province + '/' + $scope.season + '/' + $scope.division + '/' + $scope.matchday,
                        headers
                    ).then(function (response) {
                        $scope.matchesPerDay = [];

                        angular.forEach(response.data, function (match) {
                            if (!$scope.matchesPerDay[match.matchday]) {
                                $scope.matchesPerDay[match.matchday] = [];
                            }

                            $scope.matchesPerDay[match.matchday].push(match);
                        });

                        $scope.ready = true;
                    });

                    // Fetch rankings every 15 minutes.
                    $timeout(fetchData, 15*60*1000);
                };

                // Initial fetch.
                fetchData();

            }
        };
    })

    // Display next matches for all teams of a specified reg number.
    .directive('matchesNext', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber'
            },
            templateUrl: 'matches_next.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/next/' + $scope.season + '/' +
                    $scope.regnumber, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display next matches for all teams of a specified reg number in a slider.
    .directive('matchesNextSlider', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber'
            },
            templateUrl: 'matches_next_slider.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/next/' + $scope.season + '/' +
                    $scope.regnumber, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display previous matches for all teams of a specified reg number.
    .directive('matchesPrev', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber'
            },
            templateUrl: 'matches_next.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/prev/' + $scope.season + '/' +
                    $scope.regnumber, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display prev matches for all teams of a specified reg number in a slider.
    .directive('matchesPrevSlider', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber'
            },
            templateUrl: 'matches_next_slider.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/prev/' + $scope.season + '/' +
                    $scope.regnumber, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })


    // Display next match(es) for a specific team in a specific division.
    .directive('matchesDivisionNext', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber',
                division: '@division',
                number: '@number'
            },
            templateUrl: 'matches_division_next.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/next/' + $scope.season + '/' +
                    $scope.regnumber + '/' + $scope.division + '/' + $scope.number, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display previous match(es) for a specific team in a specific division.
    .directive('matchesDivisionPrev', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber',
                division: '@division',
                number: '@number'
            },
            templateUrl: 'matches_division_next.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/prev/' + $scope.season + '/' +
                    $scope.regnumber + '/' + $scope.division + '/' + $scope.number, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display next match(es) for a specific team in a specific division with logo.
    .directive('matchesDivisionNextFull', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber',
                division: '@division',
                number: '@number'
            },
            templateUrl: 'matches_division_next_full.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/next/' + $scope.season + '/' +
                    $scope.regnumber + '/' + $scope.division + '/' + $scope.number, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })

    // Display previous match(es) for a specific team in a specific division with logo.
    .directive('matchesDivisionPrevFull', function ($http) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                season: '@season',
                regnumber: '@regnumber',
                division: '@division',
                number: '@number'
            },
            templateUrl: 'matches_division_next_full.tpl.html',
            link: function ($scope, element) {

            },
            controller: function ($scope) {
                $scope.ready = false;
                $scope.matches = [];

                $scope.base_url = base_url;

                $http.get(base_url + '/matches/prev/' + $scope.season + '/' +
                    $scope.regnumber + '/' + $scope.division + '/' + $scope.number, headers)
                    .then(function (response) {
                        $scope.matches = response.data;
                        $scope.ready = true;
                    });
            }
        };
    })
;
