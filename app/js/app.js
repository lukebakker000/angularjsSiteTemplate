'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate'
  ]);

myApp.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
  when('/', { 
    templateUrl: 'pages/index.html', 
    activetab: 'projects', 
    controller: 'navController' 
  })
  .when('/project/:projectId', {
    templateUrl: function (params) { return 'pages/' + params.projectId + '.html'; },
    controller: 'navController',
    activetab: 'projects'
  })
  .when('/privacy', {
    templateUrl: 'pages/privacy.html',
    controller: 'navController',
    activetab: 'privacy'
  })
  .when('/about', {
    templateUrl: 'pages/about.html',
    controller: 'navController',
    activetab: 'about'
  })
  .otherwise({ redirectTo: '/' });
  }])
  .run(['$rootScope', '$http', '$browser', '$timeout', "$route", 
  function ($scope, $http, $browser, $timeout, $route) {

  $scope.$on("$routeChangeSuccess", function (scope, next, current) {
    $scope.part = $route.current.activetab;
  });

  // onclick event handlers
  $scope.showForm = function () {
    $('.contactRow').slideToggle();
  };
  $scope.closeForm = function () {
    $('.contactRow').slideUp();
  };

  // save the 'Contact Us' form
  $scope.save = function () {
    $scope.loaded = true;
    $scope.process = true;
    $http.post('sendemail.php', $scope.message).success(function () {
        $scope.success = true;
        $scope.process = false;
    });
  };
}]);

myApp.config(['$locationProvider', function($location) {
  $location.hashPrefix('!');
}]);