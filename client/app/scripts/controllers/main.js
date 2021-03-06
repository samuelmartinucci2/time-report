'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeReportApp.controllers', ['timeReportApp.services'])
  .controller('MainCtrl', ['$scope', 'TimeRecord', function ($scope, TimeRecord) {
    $scope.selectRecord = function(record) {
      $scope.selectedRecord = angular.copy(record);
    };
    $scope.updateRecord = function(refresh) {
      $scope.selectedRecord.$update(function() {
        $scope.errors = null;
        if (refresh) $scope.timeRecords = TimeRecord.query();
        $('#recordModal').modal('hide');
        $('#descModal').modal('hide');
      },
      function(errors) {
        $scope.errors = errors.data;
      });
    }
    $scope.timeRecords = TimeRecord.query({q: $scope.filter_time});
    $scope.current_time_record = TimeRecord.current_record();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.clear = function () {
      $scope.filter_time = null;
    };

    $scope.$watch('filter_time', function() {
      $scope.timeRecords = TimeRecord.query({q: $scope.filter_time});
    });

    $scope.checkin = function() {
      var time_record = new TimeRecord({start_time: new Date()});
      time_record.$save(function() {
        $scope.timeRecords = TimeRecord.query();
        $scope.current_time_record = time_record
      });
    }

    $scope.checkout = function() {
      $scope.current_time_record.end_time = new Date();
      $scope.current_time_record.$update(function() {
        $scope.timeRecords = TimeRecord.query();
        $scope.current_time_record = null;
      });
    }

    $scope.notSameDay = function(date1, date2) {
      date1 = new Date(date1);
      date2 = new Date(date2);

      var aDate1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());
      var aDate2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

      return aDate2.getTime() > aDate1.getTime()
    }
  }]);
