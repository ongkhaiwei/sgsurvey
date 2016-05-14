/**
 * surveys (Simple online surveys application)
 *
 * Copyright 2015 IBM Corp. All Rights Reserved
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// js/app.js

'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'surveys' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('surveys', [
    'ui.router',
    'ngResource',
    'app.services',
    'app.controllers'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    /**
     * Define all the states and routes of the application.
     */
    $stateProvider
        .state('question', {
            url: '/question',
            templateUrl: 'partials/question.html',
            controller: 'QuestionCtrl'
        })
        .state('voted', {
            url: '/voted',
            templateUrl: 'partials/thanks.html',
            controller: 'ThankYouCtrl'
        });
    
    $urlRouterProvider.otherwise('/question');
}]);
