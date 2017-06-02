/**
 * Created by CNY on 2017/5/17.
 */
angular.module('coms' ,
  [])
  .factory('func_com', [function () {
    return {
      parseInt:function(obj) { return parseInt(obj);
      }
    };
  }])
  .factory('valid_com', [function () {
    return {
      isNum:function (obj) {
        return typeof(obj) == 'Number';
      }
    }
  }])
  .factory('enum_com', [function () {
    return{
      http:new Enum([
        /*常规响应码*/
        {name:'OK',val:'200',msg:'成功'},//服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。
        {name:'NoAuth',val:'203',msg:'请求资源未授权'},//服务器已成功处理了请求，但返回了可能来自另一来源的信息。
        {name:'NotModified',val:'304',msg:'数据未修改'},//自从上次请求后，请求的网页未被修改过。服务器返回此响应时，不会返回网页内容。
        {name:'NotFound',val:'404',msg:'请求资源未找到'},//服务器找不到请求的网页。例如，如果请求是针对服务器上不存在的网页进行的，或者请求地址错误。
        {name:'BadRequest',val:'400',msg:'参数或请求错误'},//服务器不理解请求的语法。
        {name:'Forbidden',val:'403',msg:'访问地址非法或被禁止'},//服务器拒绝请求。
        {name:'ServerUnable',val:'503',msg:'服务不可用'},//目前无法使用服务器（由于超载或进行停机维护）。通常，这只是一种暂时的状态。
        {name:'ServerError',val:'500',msg:'服务器内部错误'},//服务器遇到错误，无法完成请求。

        /*自定义响应码*/
        {name:'IdentityFail',val:'420',msg:'身份验证失败'},//
        {name:'PwdError',val:'421',msg:'输入密码错误'},//
        {name:'NotFoundUser',val:'422',msg:'找不到该用户'},//
        {name:'PwdModifyFail',val:'423',msg:'密码修改失败'},//
        {name:'Undefined',val:'423',msg:'发生未知错误'}//
      ])
    }
  }])

  .factory('pop_com',['$timeout','$ionicPopup','$ionicLoading' ,function($timeout,$ionicPopup,$ionicLoading){
    return{
      /***
       * 自定义弹出框
       * @param config 配置对象
       * @remark 具体配置详见$ionicPopup.show()使用即可
       */
      dialog:function(config){
        var dialog = $ionicPopup.show(config);
        $timeout(function() {
          dialog.close(); //由于某种原因3秒后关闭弹出
        }, 20000);
      },
      /***
       * alert弹出框
       * @param msg 信息文字
       * @param [callback] 确定回调
       * @param [title] 标题
       */
      alert:function(msg,callback,title){
        var alertPopup = $ionicPopup.alert({
          title: title || '<p style="text-align: left;">提示</p>',
          template:'<p style="text-align: center;">'+msg+'</p>'
        });
        if (callback) {
          alertPopup.then(function(res) {
            callback();
          });
        }
      },
      /***
       * tip即时弹出框
       * @param msg 信息文字
       * @param [callback] 确定回调
       * @param [times] 显示时间，默认2500ms
       * @param [title] 标题
       * @param [subTitle] 副标题
       */
      tip:function(msg,callback,times,title,subTitle){
        // 一个精心制作的自定义弹窗
        var myPopup = $ionicPopup.show({
          template: '<p style="text-align: center;">'+msg+'</p>',
          title: title || '<p style="text-align: left;">信息</p>'
        });
        if (callback) {
          myPopup.then(function(res) {
            callback();
          });
        }
        $timeout(function() {
          myPopup.close(); //由于某种原因3秒后关闭弹出
        }, times||2500);
      },
      /***
       * confirm确认弹出框
       * @param msg 信息文字
       * @param [funcOk] 确定回调
       * @param [funcFail] 取消回调
       * @param [title] 标题，默认'信息'
       */
      confirm:function(msg,funcOk,funcFail,title){
        var confirmPopup = $ionicPopup.confirm({
          title: title||'信息',
          template: '<p style="text-align: center;">'+msg+'</p>',
          cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
          cancelType: 'button-default', // String (默认: 'button-default')。取消按钮的类型。
          okText: '确定', // String (默认: 'OK')。OK按钮的文字。
          okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
        });
        confirmPopup.then(function(res) {
          if (funcOk) {
            funcOk();
          }
        },function() {
          if (funcFail) {
            funcFail();
          }
        });
      },
      /***
       * 加载动画
       * @param bShow 为true则显示加载动画，否则关闭
       */
      loading:function(bShow) {
        if (bShow) {
          $ionicLoading.show({
            duration: 20000,
            template: '数据加载中...'
          });
        }else {
          $ionicLoading.hide();
        }
      }
    }
  }])
  .factory('token_com',[function(){
    return{
      get:function(){
      return localStorage.getItem('token');
      },
      set:function(token){
       localStorage.setItem('token',token);
      },
      clear:function(){
        localStorage.removeItem('token')
      }
    }
  }])



/*枚举类*/
/***
 *
 * @param {string} aParm 枚举键值对数组
 * @constructor
 * @demo
 *   var enumDemo=new Enum([
 *   {name:'OK',val:111,msg:'成功'},
 *   {name:'No',val:222,msg:'失败'}
 *   ])
 *   alert(enumDemo.OK+'---'+enumDemo.OK.msg);
 */
function Enum(aParm){
  this.aParm = aParm;
  for (var i=0;i<aParm.length;i++) {
    this[aParm[i].name] = new Number(aParm[i].val);
    this[aParm[i].name].msg = aParm[i].msg;
  }
}
Enum.prototype.toEnum= function (iCode) {
  for (var i=0;i<this.aParm.length;i++) {
    if (this.aParm[i].val==iCode) {
      return this[this.aParm[i].name];
      break;
    }
  }
  return null;
};

/*
var enumDemo=new Enum([
     {name:'OK',val:111,msg:'成功'}
    ])
alert(enumDemo.OK==111);*/
