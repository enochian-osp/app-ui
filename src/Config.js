const LS_KEY = 'enochianConfig';

let config = window.localStorage.getItem(LS_KEY);
if (config)
  config = JSON.parse(config);
else
  config = {};

const Config = {

  get(key) { return config[key] },

  set(key, val) {
    config[key] = val;
    window.localStorage.setItem(LS_KEY, JSON.stringify(config));
  }

};

export default Config;
