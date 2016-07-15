myApp.controller('PatientDataListCtrl',function($scope, $http) {
  load_names();

  function load_names() {
    // patientListLoad
    $http.get('http://localhost:3000/patientListLoad').success(function(data) {
      $scope.patients = data;
      
      $scope.setCurrentPatients = function(patient) {
        console.log(patient);
        $scope.patient = patient;
      }
    });
  };
});