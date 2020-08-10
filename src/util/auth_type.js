var authType;

(function (type) {
  type[type['USER'] = 8] = 'USER';
  type[type['ADMIN'] = 16] = 'ADMIN';
  type[type['SUPER_ADMIN'] = 32] = 'SUPER_ADMIN'
})(authType || (authType = {}))


module.exports = authType;