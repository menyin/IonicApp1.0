/*原有代码 begin*/
/*var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/!**!/!*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});*/
/*原有代码 end*/

/*-----------------------------------自动创建普通页面模块 begin-----------------------------------------------*/
/*定义要创建页面相关信息对象*/
//注意：如果页面模块为某个模块下的子模块，则name必须用"【父模块】_【当前模块】"的方式命名
var newModule = {name: 'test_one', title: '测试页1'};


var aName,pointName, lineName, iIndexLast,ctrlName ,actName;
processModuleParms();
/***
 * 处理模块名称相关字符串
 */
function processModuleParms(){
  //如包含父级模块(即包含下划线)，则控制器指定为父模块的控制器
  aName= newModule.name.split('_');
  pointName= aName.join('.');
  lineName= aName.join('/');
  iIndexLast = newModule.name.indexOf(aName[aName.length - 1])-1;
  ctrlName = newModule.name.indexOf('_') == -1 ? newModule.name : newModule.name.substring(0, iIndexLast);
  actName= newModule.name.indexOf('_') == -1 ? newModule.name : newModule.name.substring(iIndexLast);
}

var gulp = require('gulp');
var rename = require("gulp-rename");
var replace = require('gulp-replace');

/*生成一个新的页面模块(包含视图、路由、控制器)*/
gulp.task('newModule', ['create_view', 'create_route', 'create_ctrl']);

/*创建视图*/
gulp.task('create_view', function () {
  if (gulp.env.name&&gulp.env.title) {//从命令行中获取参数
    newModule.name = gulp.env.name;
    newModule.title= gulp.env.title;
    processModuleParms();
  }
  var htmlStr='<ion-view id="tabs_'+newModule.name+'" view-title="'+newModule.title+'">\n'+
      '  <ion-content class="scroll-content">\n'+
      '   新的模块 【'+newModule.title+'】\n'+
      '  </ion-content>\n'+
      '</ion-view>'
  return gulp.src('./www/views/*.html')
    .pipe(replace(/[\s\S]*/,htmlStr))
    .pipe(rename('tabs_'+newModule.name+'.html'))
    .pipe(gulp.dest('./www/views/'));
});

/*创建路由*/
gulp.task('create_route', function () {
  if (gulp.env.name&&gulp.env.title) {//从命令行中获取参数
    newModule.name = gulp.env.name;
    newModule.title= gulp.env.title;
    processModuleParms();
  }
  var routeStr = "\n "+
    "      \/*"+newModule.title+"*\/ \n "+
    "     \.state('tabs."+pointName+"', {\n"+
    "        url: '/"+lineName+"',\n"+
    "        views: {\n"+
    "          'tabs_"+newModule.name+"': {\n"+
    "            templateUrl: 'views/tabs_"+newModule.name+".html',\n"+
    "            controller: 'tabs_"+newModule.name+"_act'\n"+
    "          }\n"+
    "        },\n"+
    "       resolve: ['$ocLazyLoad', function ($ocLazyLoad) {\n"+
    "          return $ocLazyLoad.load(['ctrls/tabs_"+ctrlName+"_ctrl.js']);\n"+
    "        }]\n"+
    "      });\n"+
    "    $urlRouterProvider";
  return gulp.src('./www/js/route.js')
    .pipe(replace(/;\s+\$urlRouterProvider/g,routeStr))
    .pipe(gulp.dest('./www/js/'));
  /*.pipe(gulp.dest('./www/template/'));*/

});

/*创建控制器和Action*/
var fs = require('fs');
gulp.task('create_ctrl', function () {
  if (gulp.env.name&&gulp.env.title) {//从命令行中获取参数
    newModule.name = gulp.env.name;
    newModule.title= gulp.env.title;
    processModuleParms();
  }
  fs.exists('./www/ctrls/tabs_' + ctrlName + '_ctrl.js', function (exists) {
    if (exists) {
      var actStr="}])\n"+
        "  .controller('tabs_"+newModule.name+"_act', ['$scope', function ($scope) {\n"+
        "\n"+
        "  }]);";
      return gulp.src('./www/ctrls/tabs_' + ctrlName + '_ctrl.js')
        .pipe(replace(/(}\s*]\s*\)\s*;?\s*\s*)$/,actStr))
        .pipe(gulp.dest('./www/ctrls/'));
    }else {
      var ctrlStr = "\/**\n"+
        "* Created by CNY on "+new Date().toLocaleTimeString()+".\n"+
        " *\/\n"+
        "angular.module('tabs_"+ctrlName+"_ctrl'\n"+
        "  , [{\n"+
        "    files: [\n"+
        "      \/*样式引用*\/\n"+
        "      \/*js引用，包括带angular模块的js和普通js*\/\n"+
        "    ], cache: false\n"+
        "  }]\n"+
        ")\n"+
        "  .controller('tabs_"+newModule.name+"_act', ['$scope', function ($scope) {\n"+
        "\n"+
        "  }]);";
      return gulp.src('./www/ctrls/*.js')
        .pipe(replace(/[\s\S]*/,ctrlStr))
        .pipe(rename('tabs_'+ctrlName+'_ctrl.js'))
        .pipe(gulp.dest('./www/ctrls/'));
    }
  });

});
/*-----------------------------------自动创建普通页面模块 end-----------------------------------------------*/

