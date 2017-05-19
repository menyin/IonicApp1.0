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
            templateUrl: 'views/tabs_home.html'
          }
        }
      })

    /*账户页*/
    .state('tabs.account', {
      url: '/account',
      views: {
        'tabs_account': {
          templateUrl: 'views/tabs_account.html',
          controller: 'tabs_account_index_act'
        }
      }
      , resolve: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['ctrls/tabs_account_ctrl.js']);
      }]
    });
    $urlRouterProvider.otherwise('/tabs/home');

  });

