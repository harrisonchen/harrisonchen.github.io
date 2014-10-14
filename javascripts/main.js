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
											'<li><a href="photography.html">Photography</a></li>' +
											'<li><a href="">Videos</a></li>' +
											'<li><a href="https://www.linkedin.com/in/harrisonwchen" target="_blank">LinkedIn</li>' +
											'<li><a href="https://github.com/HarrisonChen" target="_blank">GitHub</li>' +
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

app.directive('coverView', function(){
	return{
		restrict: 'AE',
		template: 
			'<div class="about-me">' +
				'<div class="profile-pic-ctn">' +
					'<img src="images/prof-pic.jpg" alt="Harrison Chen"' +
						 'class="profile-pic" />' +
					'<div class="profile-pic-cap">Hi my name is Harrison!</div>' +
					'<!-- <h1 class="bio"></h1> -->' +
				'</div>' +
			'</div>',
		controller: function($scope, $element){

		},
		link: function(scope, element, attrs){

		}
	}
});

app.directive('vpParallax', ['$window', function($window){
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
}]);

app.directive('project', function(){
	return{
		restrict: 'AE',
		scope: {
			label: '@',
			description: '@',
			image: '@',
			linkTo: '@'
		},
		template: 
			'<div class="project-ctn">' +
				'<a href="{{linkTo}}">' +
					'<img class="project-img" src="{{image}}" />' +
					'<div class="project-description">' +
						'<h1>{{label}}</h1>' +
						'<p>{{description}}</p>' +
					'</div>' +
				'</a>' +
			'</div>',
		controller: function($scope, $element){
			
		},
		link: function(scope, element, attrs){

		}
	}
});

app.directive('projectList', ['$window', function($window){
	return{
		restrict: 'AE',
		scope: {},
		transclude: true,
		template: '<div ng-transclude></div>',
		controller: function($scope, $element){

			$scope.scrollPos = window.top.scrollY;
			var finishScroll = false;

			$scope.projectScroll = function(){
				console.log($scope.projectElms);

				for(var i = 0; i < $scope.projectElms.length; ++i){
					if(!$scope.projectTags[i] &&
						 $scope.scrollPos + window.innerHeight >= $scope.projectElms[i][0].offsetTop){
						$scope.projectElms[i].addClass('pull-up');
						$scope.projectTags[i] = true;
						if(i == $scope.projectElms.length - 1){
							finishScroll = true;
						}
					}
				}
			}

			angular.element($window).bind("scroll", function(e){
				if(!finishScroll){
					$scope.scrollPos = window.top.scrollY;
					$scope.projectScroll();
				}
			});
		},
		link: function(scope, element, attrs){
			scope.projects = element[0].getElementsByTagName('li');
			scope.projectElms = [];
			scope.projectTags = [];
			for(var i = 0; i < scope.projects.length; ++i){
				scope.projectElms.push(angular.element(scope.projects[i]));
				scope.projectTags.push(false);
			}

			scope.projectScroll();
		}
	}
}]);

app.directive('instagramPhotos', ['$http', function($http){
	return {
		restrict: 'AE',
		scope: {},
		template: '<div class="instagram-photos">' +
								'<ul>' +
									'<li ng-repeat="photo in instagramPhotos">' +
										'<img src="{{photo}}" />' +
									'<li>' +
								'<ul>' +
							'</div>',
		controller: function($scope, $element){

			$scope.instagramObject;
			$scope.instagramPhotos = [];

			var instagramApiLink = 'https://api.instagram.com/v1/users/5063518/media/recent/?client_id=341f861fb8eb48a789828a4026d2defa';

			$http.get(instagramApiLink)
			.success(function(data){
				$scope.instagramObject = data['data'];
				for(var i = 0; i < $scope.instagramObject.length; ++i){
					$scope.instagramPhotos.push($scope.instagramObject[i].images.standard_resolution.url);
				}
			});


		},
		link: function(scope, element, attrs){

		}
	}
}]);

app.directive('instagramPhotoScroll', ['$window', function($window){
	return {
		restrict: 'AE',
		scope: {},
		template: '<div>' +
								'<instagram-photos></instagram-photos>' +
							'</div>',
		controller: function($scope, $element){
			$scope.scrollPos = window.top.scrollY;
			var finishScroll = false;

			$scope.projectScroll = function(){
				console.log($scope.projectElms);
				for(var i = 0; i < $scope.projectElms.length; ++i){
					if(!$scope.projectTags[i] &&
						 $scope.scrollPos + window.innerHeight >= $scope.projectElms[i][0].offsetTop){
						$scope.projectTags[i] = true;
						$scope.projectElms[i].addClass('insta-show');
						if(i == $scope.projectElms.length - 1){
							finishScroll = true;
						}
					}
				}
			}

			angular.element($window).bind("scroll", function(e){
				if(!finishScroll){
					$scope.scrollPos = window.top.scrollY;
					$scope.projectScroll();
				}
			});

		},
		link: function(scope, element, attrs){
			scope.projects = element[0].getElementsByTagName('li');
			scope.projectElms = [];
			scope.projectTags = [];
			for(var i = 0; i < scope.projects.length; ++i){
				scope.projectElms.push(angular.element(scope.projects[i]));
				scope.projectTags.push(false);
			}

			scope.projectScroll();

		}
	}
}]);