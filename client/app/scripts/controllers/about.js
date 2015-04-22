'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeReportApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
