// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('TodoCtrl', function($scope, $ionicModal, localStorageService) {
  // Set variable
  $scope.shouldShowDelete = false;


  // Get tasks from local storage
  if (localStorageService.get('taskData')) {
      $scope.tasks = localStorageService.get('taskData');
  } else {
      $scope.tasks = [];
  }


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    localStorageService.set('taskData', $scope.tasks);
    $scope.taskModal.hide();
    task.title = "";
  };
  
  // Delete a task
  $scope.deleteTask = function(task) {
    var index = $scope.tasks.indexOf(task);
    if (index > -1) {
      $scope.tasks.splice(index, 1);
      localStorageService.set('taskData', $scope.tasks);
    }
  };


  // Move task to a new position
  $scope.moveTask = function(task, fromIndex, toIndex) {
    $scope.tasks.splice(fromIndex, 1);
    $scope.tasks.splice(toIndex, 0, task);
    localStorageService.set('taskData', $scope.tasks);
  };


  // Open new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };


  // Close new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
})
