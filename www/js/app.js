angular.module('starter', ['ionic','oc.lazyLoad', 'route','coms'])//,'ionicLazyLoad','ngCordova' //ngCordova需要在打包APP时才会注入，webapp需先去掉。
  .run(function ($ionicPlatform) {

    /*ionic平台设备配置*/
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
        // org.apache.cordova.statusbar required
        //StatusBar.styleLightContent();
      }
    });
  })

  /*ionic界面兼容配置*/
  .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');//还有其它一些配置到网上查找
    $ionicConfigProvider.platform.android.tabs.position("buttom");
    $ionicConfigProvider.platform.ios.tabs.position("buttom");
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    //$ionicConfigProvider.platform.ios.tabs.position('bottom');
    //$ionicConfigProvider.platform.android.tabs.style('standard');
    //$ionicConfigProvider.platform.android.tabs.position('bottom');
    //
    //$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    //$ionicConfigProvider.platform.android.navBar.alignTitle('center');
    //
    //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    //$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    //
    //$ionicConfigProvider.platform.ios.views.transition('ios');//设置ios视图转场效果
    //$ionicConfigProvider.platform.android.views.transition('android');//设置ios视图转场效果
    $ionicConfigProvider.platform.android.views.maxCache(5); //安卓缓存5个view，ios默认10个
  }])

  /*网站主域配置*/
  .constant('ip_const', "localhost:8080/");

