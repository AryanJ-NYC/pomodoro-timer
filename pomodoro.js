var app = angular.module('PomodoroApp', []);

app.controller('PomodoroController', ['$scope', '$interval', function($scope, $interval) {
  var sessionPromise;
  var sessionTime = true;
  var breakTime = false;
  $scope.buttonText = "Session";
  $scope.buttonTime;
  
  $scope.session = {
    length: 25 * 60,
    increase: function() {
      this.length += 60;
      if (sessionTime) $scope.buttonTime += 60;
    },
    decrease: function() {
      if (this.length > 60) {
        this.length -= 60;
        if (sessionTime) $scope.buttonTime -= 60;
      }
    },
    countdown: function() {
      if (!sessionPromise) $scope.start();
      else {
        $scope.stop();
      }
    }
  };
  
  $scope.break = {
    length: 5 * 60,
    increase: function() {
      this.length += 60;
      if (breakTime) $scope.buttonTime += 60;
    },
    decrease: function() {
      if (this.length > 60) {
        this.length -= 60;
        if (breakTime) $scope.buttonTime -= 60;
      }
    }
  };
  
  $scope.buttonTime = $scope.session.length;
    
  $scope.start = function() {
    sessionPromise = $interval(function() {
      $scope.buttonTime--;
      if ($scope.buttonTime <= 0) {
        if (sessionTime) {
          sessionTime = false;
          breakTime = true;
          $scope.buttonTime = $scope.break.length;
          $scope.buttonText = "BREAK!";
        } else if (breakTime) {
          sessionTime = true;
          breakTime = false;
          $scope.buttonTime = $scope.session.length;
          $scope.buttonText = "Session";
        }
      }
    }, 1000);
  };
  
  $scope.stop = function() {
    $interval.cancel(sessionPromise);
    sessionPromise = null;
  };
}]);

app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);
