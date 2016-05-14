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

// js/directives.js

'use strict';

angular.module('app.directives', [])

.directive('donut', function() {
    return {
        restrict: 'E',
        template: '<div id="donut-chart" class="chart"></div>',
        replace: false,
        scope: {
            data: '=',
            voters: '='
        },
        link: function(scope, element, attrs) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: element[0],
                    type: 'pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 0
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            connectorColor: 'silver'
                        },
                        startAngle: -180,
                        endAngle: 180,
                        center: ['50%', '50%'], 
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Voters',
                    innerSize: '50%',
                    data: []
                }]
            });
 
            scope.$watch('data', function(votes) {
                chart.series[0].setData(votes);
            });

            scope.$watch('voters', function(totalVoters) {
                chart.setTitle({text: 'Total Voters<br>' + scope.voters});
            });
        }
    };
});