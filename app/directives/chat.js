'use strict';


angular.module('MyCrush')
.directive('ngSearch', [function () {
      return function(scope, elem, attrs) {
        elem.bind('keydown keypress', function(event) {
          if (event.which === 13) {
            scope.$apply(function() {
              scope.$eval(attrs.ngSearch);
            });
            scope.mind = '';
            event.preventDefault();
          }
        });
      }
  }]);
