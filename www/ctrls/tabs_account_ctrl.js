/**
 * Created by CNY on 2017/5/17.
 */
angular.module('tabs_account_ctrl'
  ,[{  files: [
    /*样式引用*/
    'css/tabs_account.css',
    'css/tabs_login.css',
    /*js引用，包括带angular模块的js和普通js*/
    'blls/user_bll.js',
    'testjs.js'
  ], cache: false
  }]
)
.controller('tabs_account_index_act', ['$scope','user_ser',function ($scope,user_ser) {
    user_ser.getUserData()
      .then(function (success) {
        $scope.data = success;
      }, function (error) {
        $scope.data = error;
      });
  }])
.controller('tabs_account_login_act', ['$scope','user_ser',function ($scope,user_ser) {

}])
.controller('tabs_account_cart_act', ['$scope','user_ser',function ($scope,user_ser) {

  }]);

