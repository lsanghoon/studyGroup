var myApp = angular.module('myApp', ['ui.router','ui.bootstrap']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  // 맞지 않는 모든 URL에 대해 redirect to /deshBoard
  $urlRouterProvider.otherwise("/home");

  // SET UP states
  $stateProvider
    .state('home', {   // ui-sref로 불러오는것?
      url: "/home",    // 해당 URL을 사용
      templateUrl: "views/home.html",  // 탬플릿 URL 
      controller: "homeCtrl"
    })
    .state('login', {   // ui-sref로 불러오는것?
      url: "/login",    // 해당 URL을 사용
      templateUrl: "views/login.html",   // 탬플릿 URL 
      controller: "loginCtrl"
    })
    .state('notice', {   // ui-sref로 불러오는것?
      url: "/notice",    // 해당 URL을 사용
      templateUrl: "views/notice.html",   // 탬플릿 URL 
      controller: "noticeCtrl"
    })
    .state('noticeList', {   // ui-sref로 불러오는것?
      url: "/notice/list",    // 해당 URL을 사용
      templateUrl: "views/noticeList.html",   // 탬플릿 URL 
      controller: "noticeCtrl"
    })
    .state('community', {   // ui-sref로 불러오는것?
      url: "/community",    // 해당 URL을 사용
      templateUrl: "views/community.html",   // 탬플릿 URL 
      controller:"communityCtrl"
    })
});