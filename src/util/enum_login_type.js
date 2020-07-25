var loginType;

(function (type) {
  type[type['USER_MINI_PROGRAM'] = "100"] = 'USER_MINI_PROGRAM';
  type[type['USER_EMAIL'] = "101"] = 'USER_EMAIL';
  type[type['USER_MOBILE'] = "102"] = 'USER_MOBILE'
})(loginType || (loginType = {}))


module.exports = loginType