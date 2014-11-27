var app = angular.module('app', []);

app.controller('tabsCtrl', ['$scope', function($scope){
	$scope.about = function(){
		$scope.variable = "container-right";
	};
}]);

app.controller('terminalCtrl', ['$scope', '$timeout', function($scope, $timeout){
	// var message = ['H', 'e', 'l', 'l', 'o'];
	var message1 = "Hello World,";
	var message2 = " my name is Harrison!";
	var message3 = "I study computer engineering at UC Riverside";
	var message4 = "I love web & mobile application";
	var message5 = "I love web & mobile app";
	var message6 = " development";
	var message7 = "Sometimes I workout, mountain bike, and go rockclimbing";
	var message8 = "Enough about me,";
	var message9 = " take a look around my page!";
	$scope.message = "";
	waitTime = 0;

	pause(3000);
	showMessage(message1);
	pause(1000);
	showMessage(message2);
	pause(1500);
	deleteMessage(message1 + message2);
	showMessage(message3);
	pause(1500);
	deleteMessage(message3);
	showMessage(message4);
	pause(300);
	editMessage(message4, message5);
	showMessage(message6);
	pause(1500);
	deleteMessage(message5 + message6);
	showMessage(message7);
	pause(1500);
	deleteMessage(message7);
	showMessage(message8);
	pause(1000);
	showMessage(message9);

	function timerHelper(){
		waitTime += 50;
		return waitTime;
	}

	function setMessage(message, i){
		$timeout(function(){
			$scope.message += message[i];
		}, timerHelper());
	}

	function setMessageReverse(message, i){
		$timeout(function(){
			$scope.message = message.substring(0, i);
		}, timerHelper());
	}

	function showMessage(message){
		for(var i = 0; i < message.length; i++){
			setMessage(message, i);
		}
	}

	function deleteMessage(message){
		for(var i = message.length; i >= 0; i--){
			setMessageReverse(message, i);
		}
	}

	function editMessage(message, newMessage){
		for(var i = message.length; i >= newMessage.length; i--){
			setMessageReverse(message, i);
		}
	}

	function pause(milliseconds){
		waitTime += milliseconds;
	}
}]);