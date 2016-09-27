/* global ActiveXObject */
import querystring from 'querystring';
// import cfg from '../config/cfg';
const svrUrl = 'http://localhost:5000/';

class Response {
  constructor(body, opts) {
    this.body = body;
    this.status = opts.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.spendTime = opts.spendTime;
  }

  json() {
    return JSON.parse(this.body);
  }
}

function getXHR() {
  return (window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP'));
}

/**
 * options:
 *   method - 'GET', 'POST'
 *   body - POST的时候传入的是object
 *   timeout - 有这个参数的时候才会有超时机制
 */
function fetchFuc(url, { method = 'GET', timeout = null, body = null } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = getXHR();
    xhr.open(method, url, true);

    const startTime = new Date().valueOf();
    let reqTimeout = null;
    if (timeout) {
      reqTimeout = setTimeout(() => {
        xhr.abort();
        reject(new Error('network_timeout'));
      }, timeout);
    }

    function onReady() {
      if (xhr.readyState === 4) {
        clearTimeout(reqTimeout);
        if (xhr.status === 200) {
          const spendTime = new Date().valueOf() - startTime;
          resolve(new Response(xhr.responseText, { status: xhr.status, spendTime }));
        } else {
          reject(new Error('request to ' + url + ' failed, status: ' + xhr.status));
        }
      }
    }

    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
      // IE-specific logic here
      xhr.setRequestHeader('Accept-Charset', 'utf-8');
      xhr.onreadystatechange = onReady;
    } else {
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text\/plain; charset=utf-8');
      }
      xhr.onload = onReady;
    }

    if (method === 'GET') {
      xhr.send();
    } else if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      const data = querystring.stringify(body);
      xhr.send(data);
    }
  });
}

function fetch(gain, cb) {
  if (!gain) {
    console.error('gain is a null!');
    return;
  }
  const dt = {};
  dt.method = 'POST';
  dt.body = gain;
  dt.timeout = gain.timeout || 10000;
  fetchFuc(svrUrl, dt).then(response => {
    if (cb) {
      const result = response.json();
      if (Number(result.code) !== 0) {
        cb(result.msg, result);
      } else {
        cb(null, result);
      }
    }
  }).catch(err => {
    console.error(' err : ' + err);
    const er = '' + err;
    if (cb) {
      cb(er);
    }
  });
}


export default fetch;
