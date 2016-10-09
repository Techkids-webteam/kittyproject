/**
 * Created by Admin on 03/10/2016.
 */



var app = angular.module('hackApp', ['ngCookies']);

app.controller('hackCtrl', function($scope, $http, $cookieStore) {
  var user =$cookieStore.get('user');

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '522462741276677',
      xfbml      : true,
      version    : 'v2.7'
    });

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        var data = {
          facebook_id : uid,
          accessToken : accessToken
        };
        $cookieStore.put('user', data);
        getdata(data);
      } else {
        var data = {};
        getdata(data);
      }
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function loginFb() {
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me',{fiels: 'name, email'}, function(response) {
          var data = response;
          data.facebook_id = response.id;
          var token = FB.getAuthResponse();
          data.accessToken = token.accessToken;
          $cookieStore.put('user', data);
          user =$cookieStore.get('user');
          getdata(data);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  $scope.showImg = function (id , n) {
    var item = $scope.data[id];
    item.slide_index += n;
    if(item.slide_index < 1) {
      item.slide_index = item.group_img.length + 1;
    } else {
      if (item.slide_index > item.group_img.length){
        item.slide_index = 1;
      }
    }
  };


  function getdata(data) {
    $http.post('http://techkids.vn:9196/api/hackathon/data', data).success(function (data) {
      $scope.data = data.items ;
      console.log($scope.data);
      $scope.data.forEach(function (item, i) {
        item.slide_index = 1;
      });
    });
  }

  $scope.like = function (team_id) {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $scope.data.forEach(function (item) {
          if(item._id == team_id) item.is_like = true;
        });
        var data;
        if(user){
          data = {
            facebook_id : user.facebook_id,
            accessToken : user.accessToken
          }
          $cookieStore.put('user', data);
          user =$cookieStore.get('user');
        }
        else {
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          data = {
            facebook_id : uid,
            accessToken : accessToken
          };
          $cookieStore.put('user', data);
          user =$cookieStore.get('user');
        }
      } else if (response.status === 'not_authorized') {
        loginFb();
      }
      else {
        loginFb();
      }
    });
    var data = {
      id: team_id,
      access_token: user.accessToken
    };
    console.log(data);
    $http.post('http://techkids.vn:9196/api/hackathon/like', data).success(function (res) {
      getdata(user);
    });
  };

  $scope.share = function (team) {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://techkids.vn/hackathon#' + team.id,
      caption: 'Cuộc thi Techkids Hackathon',
      description: team.content,
      name: "Techkids",
      picture: team.group_img[0]

    }, function(response){console.log(response)});
  }

});
