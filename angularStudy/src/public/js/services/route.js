var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  console.log("route");
  // 맞지 않는 모든 URL에 대해 redirect to /deshBoard
  $urlRouterProvider.otherwise("/deshBoard");

  // SET UP states
  $stateProvider
    .state('deshBoard', {   // ui-sref로 불러오는것?
      url: "/deshBoard",    // 해당 URL을 사용
      templateUrl: "views/deshBoard.html"   // 탬플릿 URL 
    })
    .state('deshBoard.list', {
      url: "/list",
      templateUrl: "views/deshBoard.list.html",
      controller: function($scope) {        // 컨트롤러 선택 or SET UP
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })
    .state('patientData', {
      url: "/patientData",
      templateUrl: "views/patientData.html",
      controller: "PatientDataListCtrl"
    })
    .state('patientData.list', {
      url: "/list",
      templateUrl: "views/patientData.list.html",
      controller: "PatientDataListCtrl"
    })
});