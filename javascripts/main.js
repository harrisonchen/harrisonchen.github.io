var app = angular.module('app', []);

app.directive('mainNav', function(){
	return{
		restrict: 'AE',
		template: '<nav>' +
								'<a href="index.html"><div class="home-btn" /></div></a>' +
								'<ul>' +
									'<li><a href="about.html">About</span></a></li>' +
									'<li><a href="">Blog</a></li></div>' +
									'<li><a href="assets/hc-resume-2014.pdf">Portfolio</a></li></div>' +
									'<li class="dropdown-btn">' +
										'<a href="https://github.com/HarrisonChen">Explore&darr;</a>' +
										'<ul>' +
											'<li><a href="">Photography</a></li>' +
											'<li><a href="">Videos</a></li>' +
										'</ul>' +
									'</li>' +
								'</ul>' +
							'</nav>',
		controller: function($scope, $element){
			
		},
		link: function(scope, element, attrs){

		}
	}
});

app.directive('vpParallax', function($window){
	return{
		restrict: 'AE',
		template: 
			'<a href="#">' +
				'<div class="viewport-img" id="vp-adventure">' +
					'<img src="images/gospel-rock-panorama.jpg" alt="Gospel Rock Panorama" />' +
					'<div class="ctr-img-txt adventure-txt">' +
						'#adventure' +
					'</div>' +
			  '</div>' +
			'</a>' +
			'<a href="#">' +
			  '<div class="viewport-img" id="vp-photography">' +
					'<img src="images/golden-gate-bridge.jpg" alt="Golden Gate Bridge" />' +
					'<div class="ctr-img-txt photography-txt">' +
						'#photography' +
					'</div>' +
			  '</div>' +
			'</a>' +
			'<a href="#">' +
				'<div class="viewport-img" id="vp-bike">' +
					'<img src="images/mtb-1.jpg" alt="Mountain Biking" />' +
					'<div class="ctr-img-txt bike-txt">' +
						'#bike' +
					'</div>' +
			  '</div>' +
			'</a>',
		controller: function($scope, $element){
			$scope.parallaxAdventure = function(){
				if($scope.scrollPos + window.innerHeight >= $scope.vpBikePos){
					$scope.vpBike.addClass("viewport-img-expand");
				}
				if($scope.scrollPos + window.innerHeight >= $scope.vpPhotographyPos){
					$scope.vpPhotography.addClass("viewport-img-expand");
				}
				if($scope.scrollPos + window.innerHeight >= $scope.vpAdventurePos){
					$scope.vpAdventure.addClass("viewport-img-expand");
				}
				$scope.vpAdventure = angular.element(document.querySelector('#vp-adventure'));
				$scope.vpPhotography = angular.element(document.querySelector('#vp-photography'));
				$scope.vpBike = angular.element(document.querySelector('#vp-bike'));
				$scope.vpAdventurePos = $scope.vpAdventure[0].offsetTop;
				$scope.vpPhotographyPos = $scope.vpPhotography[0].offsetTop;
				$scope.vpBikePos = $scope.vpBike[0].offsetTop;
			}

			angular.element($window).bind("scroll", function(e){
				$scope.scrollPos = window.top.scrollY;
				$scope.parallaxAdventure();
			});
		},
		link: function(scope, element, attrs){
			scope.scrollPos = window.top.scrollY;
			scope.vpAdventure = angular.element(document.querySelector('#vp-adventure'));
			scope.vpPhotography = angular.element(document.querySelector('#vp-photography'));
			scope.vpBike = angular.element(document.querySelector('#vp-bike'));
			scope.vpAdventurePos = scope.vpAdventure[0].offsetTop;
			scope.vpPhotographyPos = scope.vpPhotography[0].offsetTop;
			scope.vpBikePos = scope.vpBike[0].offsetTop;
		}
	}
});