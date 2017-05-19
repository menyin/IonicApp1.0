/**
 * Created by CNY on 2017/5/17.
 */
angular.module('user_bll'
  ,[{files:[
   'daos/daos.js'
  ],cache:false
  }])
  .factory('user_ser',['ser_dao','$q',function (ser_dao,$q) {
    return{
      getUserData: function () {
        var def=$q.defer();
        ser_dao.get('/User/Post',123456)
          .then(function (success) {
            def.resolve(success);
          }, function (error) {
            def.reject(error);
          });
        return def.promise;
      }
    }
  }]);
