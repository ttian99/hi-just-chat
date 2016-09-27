import fetch from './Fetch';
const Req = {};

Req.login = (params, cb) => {
  console.log('------ req login --');
  params.cmd = 'login';
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

Req.searchVillage = (params, cb) => {
  console.log('------ req searchVillage --');
  params.cmd = 'search-village';
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

Req.checkKey = (params, cb) => {
  console.log('------ req checkKey --');
  params.cmd = 'check-key';
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

Req.selectKey = (params, cb) => {
  console.log('------ req selectKey --');
  params.cmd = 'select-key';
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

Req.selRidgepole = (params, cb) => {
  console.log('------ req ridgepole --');
  params.cmd = 'select-ridgepole';
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

Req.searchLock = (params, cb) => {
  console.log('------ req searchLock --');
  params.cmd = 'search-lock';
  params.timeout = 10000;
  fetch(params, (err, json) => {
    cb(err, json);
  });
};

export default Req;
