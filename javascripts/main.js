var app = angular.module('app', []);

app.directive('mainNav', function(){
	return{
		restrict: 'AE',
		template: '<nav>' +
								'<a href="index.html"><div class="home-btn" /></div></a>' +
								'<ul>' +
									'<li><a href="about.html">About</span></a></li>' +
									'<li><a href="assets/hc-resume-2014.pdf">Blog</a></li></div>' +
									'<li><a href="portfolio.html">Portfolio</a></li></div>' +
									'<li class="dropdown-btn">' +
										'<a href="">Explore&darr;</a>' +
										'<ul>' +
											'<li><a href="">Photography</a></li>' +
											'<li><a href="">Videos</a></li>' +
											'<li><a href="https://www.linkedin.com/in/harrisonwchen">LinkedIn</li>' +
											'<li><a href="https://github.com/HarrisonChen">GitHub</li>' +
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
			$scope.scrollPos = window.top.scrollY;

			$scope.vpAdventure = angular.element(document.querySelector('#vp-adventure'));
			$scope.vpPhotography = angular.element(document.querySelector('#vp-photography'));
			$scope.vpBike = angular.element(document.querySelector('#vp-bike'));
			$scope.vpAdventurePos = $scope.vpAdventure[0].offsetTop;
			$scope.vpPhotographyPos = $scope.vpPhotography[0].offsetTop;
			$scope.vpBikePos = $scope.vpBike[0].offsetTop;

			var finishScroll = false;
			var vp = [false, false, false];

			$scope.vpParallax = function(){
				if(!vp[2] && $scope.scrollPos + window.innerHeight >= $scope.vpBikePos){
					$scope.vpAdventure.addClass("viewport-img-expand");
					$scope.vpPhotography.addClass("viewport-img-expand");
					$scope.vpBike.addClass("viewport-img-expand");
					finishScroll = true;
					vp[2] = true;
				}
				else if(!vp[1] && $scope.scrollPos + window.innerHeight >= $scope.vpPhotographyPos){
					$scope.vpAdventure.addClass("viewport-img-expand");
					$scope.vpPhotography.addClass("viewport-img-expand");
					$scope.vpBike = angular.element(document.querySelector('#vp-bike'));
					$scope.vpBikePos = $scope.vpBike[0].offsetTop;
					vp[1] = true;
				}
				else if(!vp[0] && $scope.scrollPos + window.innerHeight >= $scope.vpAdventurePos){
					$scope.vpAdventure.addClass("viewport-img-expand");
					$scope.vpPhotography = angular.element(document.querySelector('#vp-photography'));
					$scope.vpPhotographyPos = $scope.vpPhotography[0].offsetTop;
					vp[0] = true;
				}
			}

			$scope.vpParallax();

			angular.element($window).bind("scroll", function(e){
				if(!finishScroll){
					$scope.scrollPos = window.top.scrollY;
					$scope.vpParallax();
				}
			});
		},
		link: function(scope, element, attrs){
			
		}
	}
});

app.directive('project', function(){
	return{
		restrict: 'AE',
		scope: {
			title: '@',
			description: '@',
			image: '@',
			linkTo: '@'
		},
		template: 
			'<a href="{{linkTo}}">' +
				'<div class="project-ctn">' +
					'<img class="project-img" src="{{image}}"/>' +
					'<div class="project-description">' +
						'<h1>{{title}}</h1>' +
						'<p>{{description}}</p>' +
					'</div>' +
				'</div>' +
			'</a>',
		controller: function($scope, $element){
			
		},
		link: function(scope, element, attrs){

		}
	}
});