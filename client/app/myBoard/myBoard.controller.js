'use strict';

angular.module('workspaceApp')
  .controller('MyBoardCtrl', function ($scope, $http) {

  	// Create Pin Modal
  	$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
          $scope.userId = userInfo.data._id;
        }, function errorCallback(response) {
          $scope.userId = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.userId = '';
    });

    // Add pin
	
	// Form add choice
	$scope.addPinForm = {
	    title: "",
	    source: ""
	};
    $scope.$watch('addPinForm.source', function() {
        $scope.preview = $scope.addPinForm.source;
    }, true);

 	$scope.addPin= function () {
		
		$scope.pinAdd = "";

	    if(!$scope.addPinForm.title)
	      return;
      	
      	// Get pin info from the form
        var pin = {
          "userId" : $scope.userId,
          "title": $scope.addPinForm.title,
          "source": $scope.addPinForm.source,
          "like" : 0
        };
        console.log("!!!");
        console.log(pin);
        console.log("!!!");

        
        // $http.post("/api/choices", choice)
        // .then(function successCallback(response) {
        //     $scope.choices.push(response.data);
        //     $scope.choiceAdd = "Added choice!";
        //   }, function errorCallback(response) { 
        //   	$scope.choiceAdd = "Could not add choice, try again!";
        //   });
        $scope.pinAdd = "Added Pin.";
        //$scope.choiceAdd = "Could not add pin, try again.";

        // Dismiss modal
        $scope.dismiss();

        // Clear form fields
    	$scope.addPinForm.title = "";
    	$scope.addPinForm.source = "";
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
      scope:false,
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