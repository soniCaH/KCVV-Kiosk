var twitter_api_url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
var username = "kcvve";
var config = {
    data : {
        screen_name: username
        , callback : "JSON_CALLBACK"
        , include_rts : true
        , count: 20
    },
    headers: {
        'Authorization': 'OAuth oauth_consumer_key="GTCdgD6hdEhLmAqcR9Plw"', 
        'oauth_nonce': "a9ea2a13d36e80633e8b394f4e720b2c", 
        'oauth_signature': "kj%2FtPtrXllOhBSljk8o%2BprJaokc%3D", 
        'oauth_signature_method': "HMAC-SHA1", 
        'oauth_timestamp': "1466859498", 
        'oauth_token' :"535348055-Rutf002vyJvOE6k85FtaTS0hR6XSIh9ussT0KCQO", 
        'oauth_version': "1.0"
    }
};



angular.module('twitterfeed', [])
    // General ranking for a complete division.
    .directive('twitterFeed', function ($http) {
        console.log('test');
        return {
            restrict: 'EA',
            transclude: true,
            // scope: {
            //     division: '@division',
            //     season: '@season',
            //     province: '@province',
            //     teamname: '@teamname'
            // },
            templateUrl: 'twitter.tpl.html',
            link: function ($scope, element) { },
            controller: function ($scope, $timeout) {

                function fetchData() {
                    $scope.ready = false;
                    $scope.rankings = [];

                    $scope.base_url = base_url;

                    $http.get(twitter_api_url, config)
                        .then(function (response) {
                            console.log(response);
                        });

                    // Fetch rankings every 15 minutes.
                    $timeout(fetchData, 15 * 60 * 1000);
                }

                fetchData();
            }
        };
    });