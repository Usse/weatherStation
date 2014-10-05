var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('weatherController', function($scope, weatherService, $filter) {
	var orderBy = $filter('orderBy');
	$scope.cities = [
		{
			name :'London',
			id : 2643743
		},
		{
			name :'Luton',
			id : 2643339
		},
		{
			name :'Manchester',
			id : 2643123
		},
		{
			name :'Birmingham',
			id : 2655603
		}
	]; 
	$scope.activeCity = 0;

	$scope.order = function(predicate, reverse) {
  	$scope.cities = orderBy($scope.cities, predicate, reverse);
  	$scope.show = false;
  };

	$scope.fetchWeather = function(zip, key) {
		weatherService.getWeather(zip).then(function(data) {
			$scope.cities[key].data = data;
		});
	}

	$scope.showDetails = function(idx) {
		$scope.show = true;
		$scope.activeCity = idx;
	};

	angular.forEach($scope.cities, function(value, key) {
  	$scope.fetchWeather($scope.cities[key].id, key);
 	});
});


weatherApp.factory('weatherService',['$http','$q', function($http, $q) {
	function getWeather(zip) {
		var deferred = $q.defer();
		$http.get('http://api.openweathermap.org/data/2.5/weather?id=' + zip + '&units=metric')
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(err) {
			console.log("Error");
			deferred.reject(err);
		});
		return deferred.promise;
	} 
	return {
		getWeather: getWeather
	};
}]);