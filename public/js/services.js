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

// js/services.js

'use strict';

angular.module('app.services', [])

.factory('SurveyService', ['$resource', function($resource) {
    
    var Question = $resource('/api/question', {}, {
        'query': { method: 'GET',  timeout: 8000, isArray: false },
        'save':  { method: 'POST', timeout: 8000 }
    });
    
    return {
        getQuestion: function() {
            return Question.query().$promise;
        },

        postAnswer: function(choiceId) {
            return Question.save({answer: choiceId}).$promise;
        }
    };
}]);