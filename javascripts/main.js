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