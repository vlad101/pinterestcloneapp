'use strict';

angular.module('workspaceApp')
  .controller('MyBoardCtrl', function ($scope, $http) {

    $scope.pinMessage = "Add A New Pin.";

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
        // Get user id
          $scope.userId = userInfo.data._id;
          // Get all user pins by user id
          if($scope.userId) {
            $http.get('/api/pins/user/' + $scope.userId)
              .then(function successCallback(pinList) {
                  $scope.pinList = pinList.data;
                }, function errorCallback(pinList) {
                  $scope.pinListMessage = 'Something went wrong, try again.';
            }).catch( function() {
              $scope.pinListMessage = '';
            });
          }
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

    // Add pin
	
	// Add pin form initialization
	$scope.addPinForm = {
	    title: "",
	    source: ""
	};

  // Event listener for image source field
  $scope.$watch('addPinForm.source', function() {

      // Get image source from the source
      $scope.preview = $scope.addPinForm.source;
      
      // If image is invalid, replace it with the broken image icon
      $("#preview").error(function () {
         $(this).unbind("error")
         .attr("src", "https://goo.gl/gtFpLz")
         .css( "min-width", "100%" );
      });
  }, true);

  // Submit a new pin
 	$scope.addPin= function () {
		
    $scope.pinMessage = '';

    // If no title, return
    if(!$scope.addPinForm.title)
      return;
    	
  	// Get pin info from the form
    var pin = {
      "userId" : $scope.userId,
      "title": $scope.addPinForm.title,
      "userLikes" : []
    };

    // Get immage from the modal preview image
    if($scope.preview) {
      // id="preview"
      pin["source"] = $("#preview").attr("src");
    }
    else {
      // id="preview-no-image"
      pin["source"] =  $("#preview-no-image").attr("src");
    }
    
    // Add pin
    $http.post('/api/pins', {"pin" : pin})
      .then(function successCallback(response) {
          $scope.pinList.push(response.data);
          $scope.pinMessage = "Added Pin.";
          $("#addPinModal").modal('hide');
        }, function errorCallback(response) {
          $scope.pinMessage = "Could not add pin, try again.";
    }).catch( function() {
      $scope.pinMessage = '';
    });

    // Clear form fields
    $scope.pinAdd = "";    
    $scope.addPinForm.title = "";
    $scope.addPinForm.source = "";
  };

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

  // Delete pin
  $scope.deletePin = function (pinId) {
    $http.delete('/api/pins/' + pinId)
      .then(function successCallback(response) {
            for(var i in $scope.pinList) {
				if($scope.pinList[i]._id == pinId) {
					$scope.pinList.splice(i, 1);
          			$scope.pinMessage = "Deleted Pin.";
          		}
          	}
        }, function errorCallback(response) {
          $scope.pinMessage = "Could not delete pin, try again.";
    }).catch( function() {
      $scope.pinMessage = '';
    });  
  };

});