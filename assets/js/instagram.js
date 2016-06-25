angular.module('instafeed', [])
    .directive('instagramFeed', ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {


        function link(scope, element) {

            function fetchData() {


                function insertFeed(data) {

                    for (var i = 0; i < data.data.length; i++) {
                        media = data.data[i];
                        imgSrc = media.images.standard_resolution.url;
                        videoSrc = (media.videos) ? media.videos.low_bandwidth.url : false;
                        if (!videoSrc) {
                            element.append('<div class="insta-grid__media insta-grid__media--image" style="background-image: url(' + imgSrc + ');"></div>');
                        } else {
                            element.append('<div class="insta-grid__media insta-grid__media--image"><video controls class="ig-media ig-media--video" poster="' + imgSrc + '"><source src="' + videoSrc + '" type="video/mp4"></video></div>');
                        }
                    }

                    $compile(element.contents())(scope.$new());

                }

                element.addClass('ig-feed-wrap');

                $http.jsonp("https://api.instagram.com/v1/users/" + scope.userId + "/media/recent/?access_token=1481048322.bcc1b24.907fe1ac4e2d4c1faadec284be00ddb1&count=8&callback=JSON_CALLBACK")
                    .success(
                    function (data, status, headers, config) {
                        insertFeed(data);
                        console.log('Got instafeed');
                    })
                    .error(
                    function (data, status, headers, config) {
                        // Error.
                    });


                // Fetch instagram every 60 minutes.
                $timeout(fetchData, 60 * 60 * 1000);
            }

            fetchData();
        }
        return {
            retrict: "E",
            link: link,
            scope: {
                userId: '=userid'
            }
        };

    }]);
