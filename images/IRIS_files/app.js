var app = angular.module('iris', []);

app.controller('MainCtrl', ['$scope', '$window', function($scope, $window){

	var finishScroll = false;

	var titles  = document.getElementsByClassName("title");
	var parallax_2 = titles[1];
	var parallax_10 = titles[2];
	$scope.class_2 = false;
	$scope.class_10 = false;
	var parallax_2_pos = titles[0].offsetTop + titles[0].clientHeight +
						  titles[1].offsetTop + titles[1].clientHeight;
  var parallax_10_pos = parallax_2_pos + titles[2].offsetTop + titles[2].clientHeight;
  console.log(parallax_2_pos);
  console.log(parallax_10_pos);

	$scope.checkPositions = function(){
		if(($scope.scrollPos + $window.innerHeight) >= (parallax_2_pos - 100)){
			$scope.class_2 = true;
			$scope.$apply();
		}
		if(($scope.scrollPos + $window.innerHeight) >= (parallax_10_pos + 100)){
			$scope.class_10 = true;
			$scope.$apply();
			finishScroll = true;
		}
	}

	angular.element($window).bind("scroll", function(e){
		if(!finishScroll){
			$scope.scrollPos = window.top.scrollY;
			$scope.checkPositions();
			console.log($scope.scrollPos + $window.innerHeight);
		}
	});
}]);