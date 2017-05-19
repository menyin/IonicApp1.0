/**
 * Created by CNY on 2017/5/18.
 */
angular.module('daos'
  , [{
    files: [], cache: false
  }])
  .factory('ser_dao',['$q','ip_const',function ($q,ip_const) {
    return {
      get: function (url,parms) {
        debugger;
        var def=$q.defer();
        setTimeout(function () {
          def.resolve(ip_const);
        },2000);
        return def.promise;
      }
    };
  }])
  .factory('dev_dao', function () {
  });
