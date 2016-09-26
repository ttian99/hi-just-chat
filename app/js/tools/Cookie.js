// 设置cookie
exports.set = (cName, value, expiredays) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = cName + ' = ' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};
// 取回cookie
exports.get = (cName) => {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return '';
};

/**
 * 示例：
 * *
 * //设置cookie，有效期为365天
 * setCookie('username','123',365);
 * *
 * //取回，若cookie失效，将返回空
 * getCookie('username');
 * *
 * */
