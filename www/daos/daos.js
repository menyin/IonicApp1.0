/**
 * Created by CNY on 2017/5/18.
 */
angular.module('daos'
  , [{
    files: ['js/coms.js'], cache: false
  }])
  .factory('ser_dao'
   ,['$q','$http','$ionicLoading','$location','ip_const','enum_com'
    ,function ($q,$http,$ionicLoading,$location,ip_const,enum_com) {
    return {
      /***
       * 基础ajax请求
       * @param {object} config 参数对象
       * @remark 在此方法中做auth过滤和token管理
       * @example
         ser_dao.ajax( {
          method: 'GET',
          url: ip_const + url,
          params: params
         })
         .then(function success(resp){
         alert('成功'
         )},function fail(resp){
         alert('失败')
         });
       */
      ajax: function (config) {
        var def=$q.defer();
        $ionicLoading.show({
          duration: 20000,
          template: '数据加载中...'
        });
        $http(config).then(function (resp) {
          var eObj=enum_com.http.toEnum(resp.status);//转换为枚举项对象
          switch (resp.status) {
            /*处理类型：直接返回数据promise*/
            case enum_com.http.OK :
              def.resolve({data:resp.data,msg:eObj.msg});
            /*处理类型：直接跳转登录页*/
            case enum_com.http.NoAuth:
            case enum_com.http.IdentityFail:
              alert(eObj.msg, function () {
                $location.path('/tabs/login');
              });//提示2秒后跳转
              break;
            /*处理类型：提示信息并返回数据promise*/
           /* case enum_com.http.PwdError:
            case enum_com.http.NotFoundUser:
            case enum_com.http.PwdModifyFail:*/
            default :
              debugger;
              alert(eObj.msg, function () {
                def.resolve({data:resp.data,msg:eObj.msg});
              });//提示2秒后执行
          }
          debugger;
          def.resolve(data);
          $ionicLoading.hide();
        },function (resp) {
          debugger;
          def.reject(data);
          $ionicLoading.hide();
        });
        /*setTimeout(function () {
          def.resolve(ip_const);
          $ionicLoading.hide();
        },3000);*/
        return def.promise;
      },

      /***
       * get请求
       * @param {string} url 请求相对地址
       * @param {object} params 参数对象
       * @example
         ser_dao.get('/Demo/page/',{id:1111})
         .then(function success(resp){
         alert('成功');
         },function fail(resp){
         alert('失败');
         });
       */
      get:function(url,params){
        var config = {
          method: 'GET',
          url: ip_const + url,
          params: params
        };
        return this.ajax(config);
      },

      /***
       * post请求
       * @param {string} url 请求相对地址
       * @param {object} params 参数对象
       * @example
         ser_dao.post('/Demo/page/',{id:1111})
         .then(function success(resp){
           alert('成功');
           },function fail(resp){
           alert('失败');
           });
         */
      post: function (url,params) {
        var config = {
          method: 'POST',
          url: ip_const + url,
          params: params
        };
        return this.ajax(config);
      },
      /***
       * jsonp请求
       * @param {string} abs_url 请求绝对地址
       * @param {object} params 参数对象
       * @example
         ser_dao.jsonp('/Demo/page/',{id:1111})
         .then(function success(resp){
             alert('成功');
             },function fail(resp){
             alert('失败');
             });
         */
      jsonp: function (abs_url,params) {
        var config = {
          method: 'JSONP',
          url: abs_url,
          params: angular.extend({},{'callback':'JSON_CALLBACK'},params)
        };
        return this.ajax(config);
      }
    };
  }])
  .factory('dev_dao', function () {
  });
