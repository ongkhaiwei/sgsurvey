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

.controller('RealTimeChartCtrl', function($scope, socket, SurveyService) {
    
    $scope.question = {};
    $scope.votes = [];
    $scope.totalVoters = 0;

    // Load the question
    SurveyService.getCurrentStatus().then(function(status) {
        $scope.question = status.question;
        $scope.votes = status.data;
        $scope.totalVoters = status.totalVoters;
    });
    
    socket.on('status', function(updates) {
        $scope.votes = updates;
        $scope.totalVoters = 0;
        for (var i = 0; i < $scope.votes.length; i++) {
            $scope.totalVoters += $scope.votes[i][1];
        }
    });
});