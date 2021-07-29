export default function QueryString(state) {
  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  function isValidItem([k, v]) {
    if (Array.isArray(v)) {
      return v.length;
    } else if (typeof v === 'object') {
      return Object.values(v).length;
    } else {
      return v ? [k, v] : false;
    }
  }

  function merge([k, v]) {
    if (Array.isArray(v)) {
      return v.reduce((acc, cur) => [...acc, k + '=' + cur], []).join('&');
    } else if (typeof v === 'object') {
      return Object.entries(v).map(merge).join('&');
    } else {
      return [k, v].join('=');
    }
  }

  function makeQueryString(obj = {}) {
    if (isEmptyObject(obj)) return '';
    else if (obj.page !== '')
      return (
        '/' +
        obj.page +
        '?&limit=12&' +
        Object.entries(obj).filter(isValidItem).map(merge).join('&')
      );

    return (
      '?&limit=12&' +
      Object.entries(obj).filter(isValidItem).map(merge).join('&')
    );
  }

  return makeQueryString(state);
}
