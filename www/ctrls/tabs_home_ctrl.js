/**
 * Created by CNY on 2017/5/22.
 */
angular.module('tabs_home_ctrl'
  ,[{  files: [
    /*样式引用*/
    'css/tabs_home.css',
    'lib/swiper/dist/css/swiper.css',
    /*js引用，包括带angular模块的js和普通js*/
    'blls/home_bll.js',
    'lib/swiper/dist/js/swiper.js'
  ], cache: false
  }]
)
  .controller('tabs_home_act', ['$scope','home_ser',function ($scope,home_ser) {

    /*页面加载初始化*/
    $scope.$watch('$viewContentLoaded', function () {
      initBanner();
    });

    /***
     * 初始化banner轮播
     */
    function initBanner() {
      home_ser.getAdData().then(function (data) {
        $scope.adList = data;

        var headerSwiper = new Swiper('.swiper-container', {
          paginationClickable: true,//分页器可以被点击
          autoplay: 0,//轮播时间间隔
          autoplayDisableOnInteraction: false,//
          loop: true,//轮播是否循环
          // 如果需要分页器
          pagination: '.swiper-pagination',
          // 改变自动更新
          observer:true,//observer和observeParents都为true时，则当动态为weiper实例里添加图片时候，则当前swiper实例会重新实例化。一般都加上
          observeParents:true
        });
      });

    }

  }]);
