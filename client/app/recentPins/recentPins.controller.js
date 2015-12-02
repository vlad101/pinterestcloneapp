'use strict';

angular.module('workspaceApp')
  .controller('RecentPinsCtrl', function ($scope, $http) {

    $scope.pinMessage = "Add A New Pin.";

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
        	// Get user id if user logged in
	        $scope.userId = userInfo.data._id;

	          // Get all pins
            $http.get('/api/pins')
              .then(function successCallback(pinList) {
                  $scope.pinList = pinList.data;

                  // For each, pin, get user id
                  angular.forEach($scope.pinList, function(pin){
                  	// For each user id, get twitter username
				    $http.get('/api/users/' + pin.userId)
				      .then(function successCallback(response) {
				      		// Add twitter username fo the pin
					      	if(response.data.hasOwnProperty('twitter')) {
					           	pin.userName = response.data.twitter.username;
				      		}
				        }, function errorCallback(response) {
				          $scope.pinMessage = "Something went wrong, try again.";
				    }).catch( function() {
				      $scope.pinMessage = '';
				    });
                  });

                }, function errorCallback(pinList) {
                  $scope.pinListMessage = 'Something went wrong, try again.';
            }).catch( function() {
              $scope.pinListMessage = '';
            });
        }, function errorCallback(response) {
          $scope.userId = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.userId = '';
    });

    // Load pin list with Masonryjs
    (function () {
      var container = document.querySelector('#pin-list');
      var msnry = new Masonry(container, {
        gutter: 20,
        columnWidth: 200,
        sortAscending : true,
        itemSelector: '.pin'
      });
    });

  // If user like does not exist, prompt like
  // Pin creator can like own pin
  $scope.likePin = function (pinId) {
    $http.put('/api/pins/like/' + pinId , {userId: $scope.userId})
      .then(function successCallback(response) {
            // Find pin in a pin list by pin id
		  	for(var i in $scope.pinList) {
				if($scope.pinList[i]._id == pinId){
					// Add a user to a list of users who likes that pin
		  			$scope.pinList[i].userLikes.push($scope.userId);
				}
		  	}
        }, function errorCallback(response) {
          $scope.pinMessage = "Something went wrong, try again.";
    }).catch( function() {
      $scope.pinMessage = '';
    });
  };

  // If user like exists, prompt dislike
  // Pin creator can dislike own pin
  $scope.dislikePin = function (pinId) {
    $http.put('/api/pins/dislike/' + pinId, {userId: $scope.userId})
      .then(function successCallback(response) {
            // Find pin in a pin list by pin id
		  	for(var i in $scope.pinList) {
				if($scope.pinList[i]._id == pinId){
		  			// Find a user in pin user likes by user id
					for(var j in $scope.pinList[i].userLikes) {
						if($scope.pinList[i].userLikes[j] == $scope.userId) {
							// Remove a user from a list of users who likes that pin
							$scope.pinList[i].userLikes.splice(j, 1);
						}
					}
				}
		  	}
        }, function errorCallback(response) {
          $scope.pinMessage = "Something went wrong, try again.";
    }).catch( function() {
      $scope.pinMessage = '';
    });
  };
});