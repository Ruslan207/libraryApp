var libraryApp = angular.module('libraryApp', ['ngRoute']);

libraryApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'pages/books.html'
            //controller  : 'booksController'
        })

        .when('/books', {
            templateUrl : 'pages/books.html'
            //controller  : 'booksController'
        })

        .when('/authors', {
            templateUrl : 'pages/authors.html',
            controller  : 'authorsController'
        })

        .when('/author/:authorId', {
            templateUrl : 'pages/author.html',
            controller  : 'authorDetailController'
        })

        .when('/book/:bookId', {
            templateUrl : 'pages/book.html',
            controller  : 'bookDetailController'
        })

        .when('/genre/:genre', {
            templateUrl : 'pages/genre.html',
            controller  : 'genreController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

libraryApp.filter('byAuthor', function () {
    return function (books, authorId) {
        var filtered = [];
        for (var i = 0; i < books.length; i++){
            for (var j = 0; j < books[i].authors.length; j++){
                if (books[i].authors[j] == authorId){
                    filtered.push(books[i]);
                    break;
                }
            }
        }
        return filtered;
    };
});

libraryApp.controller('mainCtrl', function ($scope, $location, $rootScope) {
    $scope.text = 'test';
    $scope.books = [];
    $scope.authors = [];
    $.ajax({
        method: "GET",
        url: "db.json",
        success: function(data){
            $scope.books = data.books;
            $scope.authors = data.authors;
            try{
                $scope.$digest();
            } finally {
                $rootScope.$emit('dataLoaded');
            }
        }
    });
    $scope.setPage = function (page){
        $location.path('/'+page);
    }
    $scope.getAuthorById = function (authorId){
        for (var i = 0; i < $scope.authors.length; i++){
            if ($scope.authors[i].id == authorId){
                return $scope.authors[i];
            }
        }
    }
    $(document).ready(function() {
        setTimeout(function () {
            $(".button-collapse").sideNav();
        }, 0);
    });
})

libraryApp.controller('authorsController', function ($scope) {
    $(document).ready(function(){
        setTimeout(function() {
            $('.card-panel').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: false, // Activate on click
                    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
                    gutter: 0, // Spacing from edge
                    belowOrigin: false // Displays dropdown below the button
                }
            );
        }, 0);
    });
})

libraryApp.controller('bookDetailController', function ($scope, $routeParams, $rootScope) {
    for (var i = 0; i < $scope.books.length; i++){
        if ($scope.books[i].id == $routeParams.bookId){
            $scope.book = $scope.books[i];
            break;
        }
    }
    $rootScope.$on('dataLoaded', function() {
        try{
            $scope.$apply();
        } finally {};
    });
})

libraryApp.controller('authorDetailController', function ($scope, $routeParams, $rootScope) {
    for (var i = 0; i < $scope.authors.length; i++){
        if ($scope.authors[i].id == $routeParams.authorId){
            $scope.author = $scope.authors[i];
            break;
        }
    }
    $rootScope.$on('dataLoaded', function() {
        try{
            $scope.$apply();
        } finally {};
    });
})


libraryApp.controller('genreController', function ($scope, $routeParams, $rootScope) {
    $scope.genre = $routeParams.genre;
    $rootScope.$on('dataLoaded', function() {
        try{
            $scope.$apply();
        } finally {};
    });
})
