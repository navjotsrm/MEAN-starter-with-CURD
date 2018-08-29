var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {    
    
  var updateView=function(){
         $http.get('/employee').success(function(response) {
         $scope.employees = response; 
         $scope.employee="";
        });
  };

  var updateViewDetails = function () {
    $http.get('/details').success(function (response) {
      $scope.employeesDetailsData = response;
      $scope.employeesDetails = "";
    });
  };

  updateView();
  updateViewDetails();
  
    $scope.addEmployee = function() {
      $http.post('/employee', $scope.employee).success(function(response) {
        updateViewDetails();
      });
    };
    
  $scope.removeEmployee = function(id) {
      $http.delete('/employee/' + id).success(function(response) {
        updateViewDetails();
      });
    };
    
  $scope.editEmployee = function(id) {
      console.log(id);
      $http.get('/employee/' + id).success(function(response) {
      $scope.employee = response;
     });
   };
    
  $scope.updateEmployee = function() {
     console.log($scope.employee._id);
    $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function(response) {
      updateView();
     });
    };

    // details 

  $scope.addEmployeeDeatils = function () {
    console.log($scope.employeesDetails);
    $http.post('/details', $scope.employeesDetails).success(function (response) {
      updateViewDetails();
    });
  };

  $scope.removeEmployeeDetails = function (id) {
    $http.delete('/details/' + id).success(function (response) {
      updateViewDetails();
    });
  };

  $scope.editEmployeeDetails = function (id) {
    console.log(id);
    $http.get('/details/' + id).success(function (response) {
      $scope.employeesDetails = response;
    });
  };

  $scope.updateEmployeeDetails = function () {
    console.log($scope.employee._id);
    $http.put('/details/' + $scope.employeesDetails._id, $scope.employeesDetails).success(function (response) {
      updateViewDetails();
    });
  };
    

}]);




