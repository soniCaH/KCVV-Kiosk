angular.module( 'instafeed', [] )
.directive('instagramFeed', ['$http', '$compile', function($http, $compile) {

    function link(scope, element) {

        function insertFeed(data) {

            for(var i=0; i<data.data.length; i++) {
                media = data.data[i];
                imgSrc = media.images.standard_resolution.url;
                videoSrc = (media.videos) ? media.videos.low_bandwidth.url : false;
                if (!videoSrc) {
                    element.append( '<div class="insta-grid__media insta-grid__media--image"><img class="ig-media ig-media--img" src="'+imgSrc+'" /></div>' );
                } else {
                    element.append('<div class="insta-grid__media insta-grid__media--image"><video controls class="ig-media ig-media--video" poster="'+imgSrc+'"><source src="'+videoSrc+'" type="video/mp4"></video></div>');
                }
            }

            $compile(element.contents())(scope.$new());

        }

        element.addClass('ig-feed-wrap');

        $http.jsonp("https://api.instagram.com/v1/users/"+scope.userId+"/media/recent/?access_token=1481048322.bcc1b24.907fe1ac4e2d4c1faadec284be00ddb1?count=6&callback=JSON_CALLBACK")
            .success(
                function(data, status, headers, config){
                    insertFeed(data);
                }
            )
            .error(
                function(data, status, headers, config){

                }
            );
    }
    return {
        retrict: "E",
        link: link,
        scope: {
            userId : '=userid'
        }
    };

}]);
