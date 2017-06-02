/**
 * Created by CNY on 2017/5/18.
 */
angular.module('daos'
  , [{
    files: [
      'js/coms.js'
    ], cache: false
  }])
  .factory('ser_dao'
   ,['$q','$http','$location','ip_const','enum_com','pop_com'
    ,function ($q,$http,$location,ip_const,enum_com,pop_com) {
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
        pop_com.loading(true);//显示加载动画
        debugger;
        $http(config).then(function (resp) {
          var eObj=enum_com.http.toEnum(resp.status);//转换为枚举项对象
          /*处理类型：直接返回数据promise*/
          if (resp.status==enum_com.http.OK) {
            debugger;
            def.resolve({data:resp.data,e:eObj});
            pop_com.loading(false);//隐藏加载动画

            /*处理类型：直接跳转登录页*/
          }else if ((resp.status==enum_com.http.NoAuth)||(resp.status==enum_com.http.IdentityFail)) {
            debugger;
            pop_com.loading(false);//隐藏加载动画
            pop_com.tip(eObj.msg, function () {//提示
              $location.path('/tabs/login');//提示2.5秒后跳转
              /*def.reject({data:resp.data,e:eObj});*/
            });

          /*处理类型：提示信息并返回数据promise 如：PwdError、NotFoundUser、PwdModifyFail*/
          }else{
            pop_com.loading(false);//隐藏加载动画
            pop_com.tip(eObj.msg, function () {//提示
              def.resolve({data:resp.data,e:eObj});
            });
          }

        },function (resp) {
          debugger;
          pop_com.loading(false);//隐藏加载动画
          var eObj=enum_com.http.toEnum(resp.status)||enum_com.http.Undefined;//转换为枚举项对象
          pop_com.tip(eObj.msg, function () {//提示
            def.reject({data:resp.data,msg:enum_com.http.Undefined.msg});
          });
        });

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
