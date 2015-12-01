'use strict';

angular.module('workspaceApp')
  .controller('MyBoardCtrl', function ($scope, $http) {

    $scope.pinAddMessage = "Add A New Pin.";

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
    // Pure JS
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
         .attr("src", "assets/images/broken-image.jpg")
         .css( "min-width", "100%" );
      });
  }, true);

  // Submit a new pin
 	$scope.addPin= function () {
		
    $scope.pinAddMessage = '';

    // If no title, return
    if(!$scope.addPinForm.title)
      return;
    	
  	// Get pin info from the form
    var pin = {
      "userId" : $scope.userId,
      "title": $scope.addPinForm.title,
      "likes" : 0
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
          $scope.pinAddMessage = "Added Pin.";
        }, function errorCallback(response) {
          $scope.pinAddMessage = "Could not add pin, try again.";
    }).catch( function() {
      $scope.pinAddMessage = '';
    });    

    // Dismiss modal
    $scope.showModal = !$scope.showModal;

    // Clear form fields
    $scope.pinAdd = "";    
    $scope.addPinForm.title = "";
    $scope.addPinForm.source = "";
  };

  // Like pin
  $scope.likePin = function (pinId) {
    console.log("change Like: " + pinId);
  };

  // Delete pin
  $scope.deletePin = function (pinId) {
    console.log("delete pin: " + pinId);
  };

  // Show Pin Modal
  $scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
  };

})
  // Modal add pin form
  .directive('modal', function () {
    return {
      template: '<div id="addPin" class="modal fade">' + 
          '<div id="addPinForm" class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function (scope, element, attrs) {
        scope.title = "Add a New Pin"; //attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

		    scope.dismiss = function() {
           element.modal('hide');
        };

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });