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

// js/controllers.js

'use strict';

angular.module('app.controllers', [])

.controller('QuestionCtrl', function($scope, $rootScope, $state, SurveyService) {

    // Rudimentary control to avoid going back to the voting page if
    // someone has already voted.
    // Obviously this control is just to prevent people committing errors,
    // it doesn't forbids them to cheat: they can always reload the web page
    // and submit multiple votes.
    // For more serious control, one could keep track of the voting IP addresses
    // on the server side.
    //
    if ($rootScope.hasVoted) {
        $state.go('voted');
    }
    
    $scope.question = {};

    // Load the question
    SurveyService.getQuestion().then(function(question) {
        $scope.question = question;
    });

    $scope.postAnswer = function(choiceId) {
        SurveyService.postAnswer(choiceId).then(function() {
            $rootScope.hasVoted = true;
            $state.go('voted');
        });
    };
});