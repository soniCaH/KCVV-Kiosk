<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '535348055-Rutf002vyJvOE6k85FtaTS0hR6XSIh9ussT0KCQO';
$oauth_access_token_secret = 'lY7m7ONTXMl2cfaLUXGtOkf4prS4lldm8OgofYuY';
$consumer_key = 'GTCdgD6hdEhLmAqcR9Plw';
$consumer_secret = 'sbkTfo3k5Lrm6K80UdcwIFGAdBfrE8UwPI0eUeP2Q';
$user_id = '535348055';
$screen_name = 'kcvve';
$count = 20;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>