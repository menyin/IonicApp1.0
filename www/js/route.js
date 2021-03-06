/**
 * Created by CNY on 2017/4/7.
 */

angular.module('route', ['oc.lazyLoad'])

   .run(['$rootScope', function ($rootScope) {
   $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, options, $transition$){
   var ddd = '在这里做路由拦截';
   });
   }])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('test', {//当用服务进行跳转时可以用这个名称作为跳转目标页面的标识
        url: '/test',
        templateUrl: 'views/test.html',
        controller: 'test',
        resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/test_ctrl.js']);
        }]
      })
      .state('tabs', {//当用服务进行跳转时可以用这个名称作为跳转目标页面的标识
        url: '/tabs',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      /*首页*/
      .state('tabs.home', {
        url: '/home',
        views: {
          'tabs_home': {
            templateUrl: 'views/tabs_home.html',
            controller: 'tabs_home_act'
          }
        },
        resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_home_ctrl.js']);
        }]
      })

    /*会员页*/
    .state('tabs.account', {
      url: '/account',
      views: {
        'tabs_account': {
          templateUrl: 'views/tabs_account.html',
          controller: 'tabs_account_index_act'
        }
      },
       resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['ctrls/tabs_account_ctrl.js']);
      }]
    })
    /*会员登录页*/
      .state('tabs.login', {
        url: '/login',
        views: {
          'tabs_login': {
            templateUrl: 'views/tabs_login.html'
            ,controller: 'tabs_account_login_act'
          }
        }
        ,resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_account_ctrl.js']);
        }]
      })
      /*购物车页*/
      .state('tabs.cart', {
        url: '/cart',
        views: {
          'tabs_login': {
            templateUrl: 'views/tabs_cart.html'
            ,controller: 'tabs_account_cart_act'
          }
        }
        ,resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_account_ctrl.js']);
        }]
      })
      /*搜索页*/
      .state('tabs.search', {
        url: '/search',
        views: {
          'tabs_search': {
            templateUrl: 'views/tabs_serach.html'
            ,controller: 'tabs_goods_search_act'
          }
        }
        ,resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_goods_ctrl.js']);
        }]
      })
       /*测试页1*/
      .state('tabs.test.one', {
        url: '/test/one',
        views: {
          'tabs_test_one': {
            templateUrl: 'views/tabs_test_one.html',
            controller: 'tabs_test_one_act'
          }
        },
       resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_test_ctrl.js']);
        }]
      })
       /*测试2*/
      .state('tabs.test.two', {
        url: '/test/two',
        views: {
          'tabs_test_two': {
            templateUrl: 'views/tabs_test_two.html',
            controller: 'tabs_test_two_act'
          }
        },
       resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['ctrls/tabs_test_ctrl.js']);
        }]
      });
    $urlRouterProvider.otherwise('/tabs/home');

  });

