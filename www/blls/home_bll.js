/**
 * Created by CNY on 2017/5/24.
 */
angular.module('user_bll'
  ,[{files:[
    'daos/daos.js'
  ],cache:false
  }])
  .factory('home_ser',['ser_dao','$q',function (ser_dao,$q) {
    return{
      getAdData: function () {
        var def=$q.defer();
        var url = 'http://localhost:10080/aspx/mobile/usercenter.aspx?action=index';
        ser_dao.jsonp(url,null)
          .then(function (success) {
            console.log('bll回调ok');
            def.resolve(success);
          }, function (error) {
            console.log('bll回调error');
            def.reject(error);
          });

       /* def.resolve([{src:'daos/test_datas/banner1.jpg'},{src:'daos/test_datas/banner2.jpg'},{src:'daos/test_datas/banner3.jpg'},{src:'daos/test_datas/banner2.jpg'}]);*/
        return def.promise;
      }
    }
  }]);
