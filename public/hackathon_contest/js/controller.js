/**
 * Created by Admin on 03/10/2016.
 */

window.fbAsyncInit = function() {
  FB.init({
    appId      : '522462741276677',
    xfbml      : true,
    version    : 'v2.7'
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var app = angular.module('hackApp', ['ngCookies']);

app.controller('hackCtrl', function($scope, $http, $cookieStore) {
  var user =$cookieStore.get('user');
  if(!user) var access_token = "";
  else access_token = user.accessToken;
  $http.get('http://techkids.vn:9196/api/hackathon/data',
    {
      headers: {'Authorization': access_token}
    }
  ).success(function (data) {
    $scope.data = data.items ;
    console.log(data);
  });

  function loginFb() {
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me',{fiels: 'name, email'}, function(response) {
          var data = response;
          data.facebook_id = response.id;
          console.log(response);
          var token = FB.getAuthResponse();
          data.accessToken = token.accessToken;
          $cookieStore.put('user', data);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });

  };

  $scope.like = function (team_id) {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log(response.status);
        var data = {
          "id" : team_id
        };
        $http.post('http://techkids.vn:9196/api/hackathon/like',data, {
            headers: {'Authorization': user.accessToken}
        }).success(function (res) {
          console.log(res);

          $http.get('http://techkids.vn:9196/api/hackathon/data',
            {
              headers: {'Authorization': access_token}
            }
          ).success(function (data) {
            $scope.data = data.items ;
          });
        });
      } else if (response.status === 'not_authorized') {
        console.log("not authorized");
        loginFb();
      } else {
        loginFb();
      }
    });
  };

  $scope.share = function (id) {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://techkids.vn/hackathon#' + id
    }, function(response){console.log(response)});
  }

});
