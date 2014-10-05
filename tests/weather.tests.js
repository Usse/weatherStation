'use strict';

describe('Controller: weatherController', function () {
  beforeEach(module('weatherApp'));
  var weatherController, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    weatherController = $controller('weatherController', {
      $scope: scope
    });
  }));

  it('Should have 4 cities', function () {
    expect(scope.cities.length).toBe(4);
  });

  it('Should show city details', function () {
    scope.showDetails(0);
    expect(scope.activeCity).toBe(0);
  });

	it('Should show fetch first city', function () {
    scope.fetchWeather(2643743,0);
    setTimeout(function() {
    	expect(scope.cities[0].data).toBeDefined();	
    },200)
  });  

  it('Should order alphabetically', function () {
    scope.order('name', 'reverse');
    expect(scope.cities[0].name).toBe("Manchester");
  });
});


describe('Service: weatherService', function () {	
  beforeEach(module("weatherApp"));
  var service, $httpBackend;

	beforeEach(inject(function(weatherService, _$httpBackend_){
  	service = weatherService;
  	$httpBackend = _$httpBackend_;
	}));

	it("Should make an ajax call to openweather API", function () {
  	$httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather").respond([{
    	id: 2643743
  	}]);
  	expect(service.getWeather()).toBeDefined();
	});
});


