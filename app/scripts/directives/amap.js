'use strict';

angular.module('mapDirectiveApp')
  .directive('amap', function () {

    return {
      scope: {
        width: '@',
        height: '@',
        address: '@',
        readonly: '@'
      },
      template: '<div class="am-meta"><input ng-keypress="searchPlace($event)" type="text" ng-model="address"><ul><li>1</li><li ng-repeat="place in places">{{place|json}}</li></ul></div><div ng-style="mapStyle()" class="amap"><div class="am-instance"></div></div>',
      restrict: 'EA',
      controller: function($scope, $element) {
        $scope.mapStyle = function() {
          return {
            width:  $scope.width  + 'px',
            height: $scope.height + 'px'
          };
        };

        $scope.searchPlace = function($event) {
          if ($event.keyCode) {
            $scope.amSearch.search($scope.address);
          }
        };
      },

      link: function postLink(scope, element, attrs) {
        var amInstance = element.children()[1];
        var canDrag;

        if (attrs.readonly === 'true') {
          canDrag = false;
        } else {
          canDrag = true;
        }

        scope.amap = new AMap.Map(amInstance, {
          dragEnable: canDrag,
          resizeEnable: true,
          zoomEnable: true,
          jogEnable: true,
          animateEnable: true,
          level: 17
        });

        scope.amap.plugin(['AMap.ToolBar'], function() {
          var tool = new AMap.ToolBar();
          scope.amap.addControl(tool);
        });

        scope.amap.plugin(['AMap.PlaceSearch'], function() {

          scope.amSearch = new AMap.PlaceSearch({
            pageSize: 10
          });

          AMap.event.addListener(scope.amSearch, 'complete', function(places) {
            // TODO: write out the poiList. and i think i need another directive here.
            // scope.places = places.poiList.pois;
          });
        });

      }
    };
  });
