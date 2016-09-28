const cfg = {
  isDev: false,
  ver: '0.0.1', // 版本号,
  // svrUrl: 'http://localhost:5000/', // 服务器地址,
  svrUrl: 'http://120.24.209.148:5000/', // 服务器地址,
  // wsUrl: 'ws://localhost:5000', // sockect地址
  wsUrl: 'ws://120.24.209.148:5000', // sockect地址
  // // 初始化
  init: () => {
    // cfg.initRstCode(cfg);
    // cfg.initCommCfg(cfg);
    // const dev = !!this.isDev;
    // console.log('=dev = ' + dev);
    // if (dev) {
    // this.svrUrl = 'http://120.24.209.148:5000/';
    // this.wsUrl = 'ws://120.24.209.148:5000';
    // }
    console.log(cfg);
  },
  // // 初始化返回码
  // initRstCode: (cfg) => {
  //   rstCode(cfg);
  // },
  // // 初始化前后端通用配置文件
  // initCommCfg: (cfg) => {
  //   xwfCommCfg(cfg);
  // },
};

export default cfg;
