/**
 * Created by CNY on 2017/5/17.
 */
angular.module('coms' ,
  [])
  .factory('func_com', [function () {
    return {
      /***
       * 将对象转化为数字
       * @param obj {Object} 被转化对象
       * @returns {Number} 转化后数字
       */
      parseInt:function(obj) { return parseInt(obj);},

      /***
       * md5加密字符串
       * @param str 被加密字符串
       * @returns {String} 加密后字符串
       */
      md5: function (str) {
        /**
         * js md5加密代码
         */
        var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
        var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

        /*
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
        function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
        function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
        function hex_hmac_md5(k, d)
        { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
        function b64_hmac_md5(k, d)
        { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
        function any_hmac_md5(k, d, e)
        { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

        /*
         * Perform a simple self-test to see if the VM is working
         */
        function md5_vm_test()
        {
          return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }

        /*
         * Calculate the MD5 of a raw string
         */
        function rstr_md5(s)
        {
          return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
        }

        /*
         * Calculate the HMAC-MD5, of a key and some data (raw strings)
         */
        function rstr_hmac_md5(key, data)
        {
          var bkey = rstr2binl(key);
          if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

          var ipad = Array(16), opad = Array(16);
          for(var i = 0; i < 16; i++)
          {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
          }

          var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
          return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
        }

        /*
         * Convert a raw string to a hex string
         */
        function rstr2hex(input)
        {
          try { hexcase } catch(e) { hexcase=0; }
          var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
          var output = "";
          var x;
          for(var i = 0; i < input.length; i++)
          {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
              +  hex_tab.charAt( x        & 0x0F);
          }
          return output;
        }

        /*
         * Convert a raw string to a base-64 string
         */
        function rstr2b64(input)
        {
          try { b64pad } catch(e) { b64pad=''; }
          var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var output = "";
          var len = input.length;
          for(var i = 0; i < len; i += 3)
          {
            var triplet = (input.charCodeAt(i) << 16)
              | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
              | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
            for(var j = 0; j < 4; j++)
            {
              if(i * 8 + j * 6 > input.length * 8) output += b64pad;
              else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
            }
          }
          return output;
        }

        /*
         * Convert a raw string to an arbitrary string encoding
         */
        function rstr2any(input, encoding)
        {
          var divisor = encoding.length;
          var i, j, q, x, quotient;

          /* Convert to an array of 16-bit big-endian values, forming the dividend */
          var dividend = Array(Math.ceil(input.length / 2));
          for(i = 0; i < dividend.length; i++)
          {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
          }

          /*
           * Repeatedly perform a long division. The binary array forms the dividend,
           * the length of the encoding is the divisor. Once computed, the quotient
           * forms the dividend for the next step. All remainders are stored for later
           * use.
           */
          var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
          var remainders = Array(full_length);
          for(j = 0; j < full_length; j++)
          {
            quotient = Array();
            x = 0;
            for(i = 0; i < dividend.length; i++)
            {
              x = (x << 16) + dividend[i];
              q = Math.floor(x / divisor);
              x -= q * divisor;
              if(quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
          }

          /* Convert the remainders to the output string */
          var output = "";
          for(i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);

          return output;
        }

        /*
         * Encode a string as utf-8.
         * For efficiency, this assumes the input is valid utf-16.
         */
        function str2rstr_utf8(input)
        {
          var output = "";
          var i = -1;
          var x, y;

          while(++i < input.length)
          {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
            {
              x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
              i++;
            }

            /* Encode output as utf-8 */
            if(x <= 0x7F)
              output += String.fromCharCode(x);
            else if(x <= 0x7FF)
              output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x         & 0x3F));
            else if(x <= 0xFFFF)
              output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x         & 0x3F));
            else if(x <= 0x1FFFFF)
              output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x         & 0x3F));
          }
          return output;
        }

        /*
         * Encode a string as utf-16
         */
        function str2rstr_utf16le(input)
        {
          var output = "";
          for(var i = 0; i < input.length; i++)
            output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
              (input.charCodeAt(i) >>> 8) & 0xFF);
          return output;
        }

        function str2rstr_utf16be(input)
        {
          var output = "";
          for(var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
              input.charCodeAt(i)        & 0xFF);
          return output;
        }

        /*
         * Convert a raw string to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */
        function rstr2binl(input)
        {
          var output = Array(input.length >> 2);
          for(var i = 0; i < output.length; i++)
            output[i] = 0;
          for(var i = 0; i < input.length * 8; i += 8)
            output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
          return output;
        }

        /*
         * Convert an array of little-endian words to a string
         */
        function binl2rstr(input)
        {
          var output = "";
          for(var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
          return output;
        }

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */
        function binl_md5(x, len)
        {
          /* append padding */
          x[len >> 5] |= 0x80 << ((len) % 32);
          x[(((len + 64) >>> 9) << 4) + 14] = len;

          var a =  1732584193;
          var b = -271733879;
          var c = -1732584194;
          var d =  271733878;

          for(var i = 0; i < x.length; i += 16)
          {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
          }
          return Array(a, b, c, d);
        }

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t)
        {
          return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
        }
        function md5_ff(a, b, c, d, x, s, t)
        {
          return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        function md5_gg(a, b, c, d, x, s, t)
        {
          return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        function md5_hh(a, b, c, d, x, s, t)
        {
          return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5_ii(a, b, c, d, x, s, t)
        {
          return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y)
        {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function bit_rol(num, cnt)
        {
          return (num << cnt) | (num >>> (32 - cnt));
        }

        return hex_md5(str);
      },

      /***
       * 获取localStore操作对象
       * @returns {{set: set, get: get, clear: clear, remove: remove}} localStore操作对象
       * @description 包括对localStorage的增删查及清除
       * @example
       *  storage.set('myData',{name:'cny',age:123});//存储对象{name:'cny',age:123}
       *  var myData=storage.get('myData');//获取对象myData={name:'cny',age:123}
       *  storage.clear();//清除所有存储
       *  storage.remove('myData');//移除对象
       */
      storage: function () {
        return {
          set: set,
          get: get,
          clear: clear,
          remove: remove
        };

        /***
         * localStorage存储对象
         *  @param {string} key 除了null以外的任意对象
         *  @param {any object} obj 除了null以外的任意对象
         */
        function set(key,obj){
          var objType = getObjType(obj);
          var objData = null;
          if(objType=='Null'){//不能存储null
            console.error('The "value" value cannot be null');
            return;
          }
          if(objType==='number'&&isNaN(obj)){//isNaN('ddd')也为true
            objData = 'NaN';
          }else{
            switch (objType) {
              case 'Undefined':
                objData = '';
                break;
              case 'Function':
                objData=obj.toString();
                break;
              default :
                objData = obj;
                break;
            }
          }

          var data = {type: objType, value: objData};
          localStorage.setItem(key, JSON.stringify(data));
          /*       console.log(localStorage.getItem(key));
           console.log(JSON.parse(localStorage.getItem(key)));*/

        }

        /***
         * localStorage获取对象
         *  @param {string} key 除了null以外的任意对象
         *  @returns {*} 返回存储在localStorage的对象
         */
        function get(key) {
          var returnObj=null;
          var data = JSON.parse(localStorage.getItem(key));
          if(data==null) {
            return null;
          }

          switch (data.type) {
            case 'Undefined':
              returnObj = undefined;
              break;
            case 'Function':
              returnObj=(new Function('return '+data.value))();
              break;
            case 'Array':
            case 'Object':
            case 'boolean':
              returnObj=data.value;
              break;
            case 'Boolean':
              returnObj = new Boolean(data.value);
              break;
            default :
              if(data.type.charAt(0)<'Z'&&data.type.charAt(0)>'A'){
                eval('returnObj=new ' + data.type + '("' + data.value + '");');
              }else{
                data.type = data.type.charAt(0).toUpperCase()+data.type.substring(1);//转为首字符大写，如number --> Number
                eval('returnObj=' + data.type + '("' + data.value + '");');
              }
              break;
          }
          return returnObj;

        }

        /***
         * 获取任意对象直接类型
         * @param obj 对象
         * @returns {string|Null} 返回null或以下类型字符串
         * "number" 普通数字变量 如var obj=123;
         * "Number" 构造类数字变量 如var obj=new Numeber(123);
         * "string" 普通字符串变量 如var obj='abc';
         * "String" 构造类数字类变量 如var obj=new Numeber(123);
         * "boolean" 普通数字类变量 如var obj=false;
         * "Boolean" 构造类数字类变量 如var obj=new Boolean(false);
         * "Null" null变量 如var obj=null;
         * "Date" 时间类变量 如var obj=new Date();
         * "Functon" 函数类变量 如var obj=function(){};
         * "Undefined" undefined变量 如var obj=undefined;或var obj;
         * "Array" 数组类变量 如var obj=[];或var obj=new Array();
         * "Functon" 函数类变量 如var obj=function(){};或var obj=new Fuction('');
         * "MyPerson" 自定义类型 如var obj=new Person();
         */
        function getObjType(obj) {
          var type =null;
          /*var typeStr=Object.prototype.toString.call(obj);
           typeStr=typeStr.match(/[A-Z][A-Za-z]*[a-z]/)[0];*/
          if (obj===null) {
            type = 'Null';
          }else if(obj===undefined){
            type = 'Undefined';
          }else{
            var typeStr = obj.constructor.name;
            switch (typeStr) {
              case 'Number':
                type = typeof(obj) == 'number' ? 'number' : 'Number';
                break;
              case 'String':
                type = typeof(obj) == 'string' ? 'string' : 'String';
                break;
              case 'Boolean':
                type = typeof(obj) == 'boolean' ? 'boolean' : 'Boolean';
                break;
              default://包括Date、Undefined、Null、Functon、Array对象，还有自定义类型，如Person
                type = typeStr;
                break;
            }
          }
          return type;
        }

        /***
         * 将对象转化为指定类型对象
         * @param obj {any object} 对象
         * @param type {string} 目标类型字符串
         * @returns {*} 返回null或undefined或目标类型对象
         * @example var obj=getObjByType('123','number');
         * @description  type字符串为以下类型字符串
         * "number" 普通数字变量 如var obj=123;
         * "Number" 构造类数字变量 如var obj=new Numeber(123);
         * "string" 普通字符串变量 如var obj='abc';
         * "String" 构造类数字类变量 如var obj=new Numeber(123);
         * "boolean" 普通数字类变量 如var obj=false;
         * "Boolean" 构造类数字类变量 如var obj=new Boolean(false);
         * "Null" null变量 如var obj=null;
         * "Date" 时间类变量 如var obj=new Date();
         * "Functon" 函数类变量 如var obj=function(){};
         * "Undefined" undefined变量 如var obj=undefined;或var obj;
         * "Array" 数组类变量 如var obj=[];或var obj=new Array();
         * "Functon" 函数类变量 如var obj=function(){};或var obj=new Fuction('');
         */
        function getObjByType(obj,type){
          var objReturn =null;
          /*var typeStr=Object.prototype.toString.call(obj);
           typeStr=typeStr.match(/[A-Z][A-Za-z]*[a-z]/)[0];*/
          if (type==='Null') {
            objReturn =null;
          }else{
            switch (type) {
              case 'Undefined':
                objReturn =undefined;
                break;
              case 'number':
                objReturn = Number(obj);//当转换失败返回NaN
                break;
              case 'Number':
                objReturn =new Number(obj);//当转换失败返回Number { NaN }对象
                break;
              case 'string':
                objReturn =String(obj);
                break;
              case 'Number':
                objReturn =new String(obj);
                break;
              case 'boolean':
                objReturn =Boolean(obj);
                break;
              case 'Boolean':
                objReturn =new Boolean(obj);
                break;
              case 'Date':
                objReturn = new Date(obj);//当转换失败返回NaN
                break;
              case 'Array':
                objReturn =new Array(obj);//当转换失败返回NaN
                break;
              case 'Function':
                objReturn =new Fuction(obj);//当转换失败返回undefined,通常obj都会是一段js代码字符串
                break;
              case 'Object':
                objReturn = new Object(obj);//如string、numeber等会转换为String、Number对象
                break;
              default:
                objReturn=null;
                break;
            }
          }
          return objReturn;
        }

        function clear() {
          localStorage.clear();
        }

        function remove(key) {
          localStorage.removeItem(key);
        }
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
