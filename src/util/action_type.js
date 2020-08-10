var actionType;

(function (type) {
  type[type['PREV'] = 'prev'] = 'PREV';
  type[type['NEXT'] = 'next'] = 'NEXT';
})(actionType || (actionType = {}))


module.exports = actionType