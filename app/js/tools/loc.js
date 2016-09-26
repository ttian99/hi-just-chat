
function checkStorageSupport() {
  let ram;
  if (window.localStorage) {
    alert('This browser supports localStorage');
    console.log('This browser supports localStorage');
    ram = window.localStorage;
  } else {
    alert('This browser does NOT support localStorage');
    console.log('This browser does NOT support localStorage');
    ram = null;
  }
  return ram;
}

const loc = window.localStorage;

exports.set = (key, data) => {
  let value;
  if (typeof(data) === 'object') {
    value = JSON.stringify(data);
  } else {
    value = data;
  }
  loc.setItem(key, value);
};

exports.get = (key) => {
  let json;
  const data = loc.getItem(key);
  try {
    json = JSON.parse(data);
  } catch (err) {
    console.log(err);
    json = {};
  }
  return json;
};
