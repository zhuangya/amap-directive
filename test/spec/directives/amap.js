'use strict';

describe('Directive: amap', function () {

  // load the directive's module
  beforeEach(module('mapDirectiveApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
  //  element = angular.element('<amap></amap>');
  //  element = $compile(element)(scope);
  //  expect(element.text()).toBe('this is the amap directive');
  //}));

  it('should as height as specificed', inject(function($compile) {
    element = angular.element('<amap height="600"></amap>');
    element = $compile(element)(scope);
    expect(element.height()).toBe(600);
  }));

});
