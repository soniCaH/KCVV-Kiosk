var twitter_api_url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
var username = "kcvve";
var nonce=randomString(32,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'); 

var oauth_parameters = {
    oauth_consumer_key : 'GTCdgD6hdEhLmAqcR9Plw',
    oauth_nonce : nonce,
    oauth_signature_method : 'HMAC-SHA1',
    oauth_timestamp : unixtime,
    oauth_token : '535348055-Rutf002vyJvOE6k85FtaTS0hR6XSIh9ussT0KCQO',
    oauth_version : '1.0',
    screen_name:'KCVVE',
    callback: 'twitterCallback'
};

var unixtime=Math.round((new Date()).getTime() / 1000.0);
var t_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
var httpMethod = 'GET';
var consumerSecret = 'sbkTfo3k5Lrm6K80UdcwIFGAdBfrE8UwPI0eUeP2Q';
var tokenSecret = 'lY7m7ONTXMl2cfaLUXGtOkf4prS4lldm8OgofYuY';
var signature = oauthSignature.generate(httpMethod, t_url, oauth_parameters, consumerSecret, tokenSecret, { encodeSignature: true});

var config = '';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
} 



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

                    $http.jsonp(twitter_api_url, {
    headers: {
        'Authorization':
            'OAuth oauth_consumer_key="GTCdgD6hdEhLmAqcR9Plw",' +
            'oauth_signature_method="HMAC-SHA1",' +
            'oauth_timestamp='+unixtime +
            'oauth_nonce='+nonce +
            'oauth_version="1.0",' +
            'oauth_token="535348055-Rutf002vyJvOE6k85FtaTS0hR6XSIh9ussT0KCQO",'+
            'oauth_signature='+signature
    },
    params: {
        screen_name: username, 
        callback : "JSON_CALLBACK",
        include_rts : true,
        count: 20
    }
})
                        .success(function (response) {
                            console.log(response);
                        });

                    // Fetch rankings every 15 minutes.
                    $timeout(fetchData, 15 * 60 * 1000);
                }

                fetchData();
            }
        };
    });