var myApp = angular.module('DemoApp',['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/list.html',
      controller: 'CarView',
      controllerAs: 'viewCtrl'
    }).
    when('/edit/:id', {
      templateUrl: 'partials/edit.html',
      controller: 'EditCar',
      controllerAs: 'editCtrl'
    }).
    when('/add',{
      templateUrl: 'partials/edit.html',
      controller: 'AddCar',
      controllerAs: 'addCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }]);
/*
myApp.factory('CarFactory', function () {
  var cars = [{
    id: 1,
    year: 1997,
    registered: new Date(1999, 3, 15),
    make: 'Ford',
    model: 'E350',
    description: 'ac, abs, moon',
    price: 3000
  }, {
    id: 2,
    year: 1999,
    registered: new Date(1996, 3, 12),
    make: 'Chevy',
    model: 'Venture',
    description: 'None',
    price: 4900
  }, {
    id: 3,
    year: 2000,
    registered: new Date(199, 12, 22),
    make: 'Chevy',
    model: 'Venture',
    description: '',
    price: 5000
  }, {
    id: 4,
    year: 1996,
    registered: new Date(2002, 3, 15),
    make: 'Jeep',
    model: 'Grand Cherokee',
    description: 'Moon roof',
    price: 4799
  }];
  var nextId = 5;

  var getCars = function () {
    return cars;
  };

  var deleteCar = function (id) {
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].id === id) {
        cars.splice(i, 1);
        return;
      }
    }
  }
  var addEditCar = function (newcar) {
    if (newcar.id == null) {
      newcar.id = nextId++;
      cars.push(newcar);
    } else {
      for (var i = 0; i < cars.length; i++) {
        if (cars[i].id === newcar.id) {
          cars[i] = newcar;
          break;
        }
      }
    }
  };
  return {getCars: getCars, deleteCar: deleteCar, addEditCar: addEditCar};
});

*/

myApp.factory('CarFactory', ['$http', function ($http) {

  var getCars = function () { //Return Cars from the server
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/car-rest/api/cars'
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      return response;
    });
  };

  var deleteCar = function (id) {
    return $http({
      method: 'DELETE',
      url: 'http://localhost:8080/car-rest/api/cars/' + id
    }).then(function successCallback(response){
      console.log(response.data);
      return response.data;
    }, function errorCallback(response){
      return response;
    });
  };//Delete Car on the Server

  var addCar = function(newcar){
    return $http({
      method: 'POST',
      url: 'http://localhost:8080/car-rest/api/cars',
      data: newcar
    }).then(function successCallback(response){
      return response.data;
    }, function errorCallback(response){
      return response;
    });

  };//Add Car on the Server


  var editCar = function(car){}//Edit Car on the Server;
  return {
    getCars: getCars, deleteCar: deleteCar, addCar: addCar, editCar: editCar
  };
}]);

myApp.controller('AddCar', ['$scope', 'CarFactory', function($scope, CarFactory) {
  $scope.saveCar = function(){
    CarFactory.addCar($scope.newcar);
    $scope.newcar = null;
  }

}]);

myApp.controller('EditCar', ['$scope','$routeParams', 'CarFactory', function($scope, $routeParams, CarFactory){
  $scope.editCar = function(){
    for(var i =0; i < CarFactory.getCars().length; i++){
      if(CarFactory.getCars()[i].id == $routeParams.id){
        $scope.newcar = angular.copy(CarFactory.getCars()[i]);
        return;
      }
    }
  };

  $scope.saveCar = function(){
    CarFactory.editCar($scope.newcar);
  }

}]);

myApp.controller('CarView', ['$scope', 'CarFactory', function($scope, CarFactory){
  $scope.cars = null;
  CarFactory.getCars().then(function success(data){
    $scope.cars = data;
  }, function error(){

  });

  $scope.deleteCar = function(id){
    CarFactory.deleteCar(id);
  }
}]);


