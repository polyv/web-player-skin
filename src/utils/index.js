export const isIphoneX = () => {
  if (typeof window !== 'undefined' && window)
    return /iphone/gi.test(window.navigator.userAgent) && (window.screen.height >= 812 || window.screen.width >= 812);

  return false;
};

export const isIos = /iphone/gi.test(window.navigator.userAgent);

/**
 * 时间秒数格式化为时分秒
 * @param result
 * @returns {string}
 */
export const timeFormat = (result, timeShowBlock) => {
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

  if (timeShowBlock === 2)
    return result = h + ':' + m + ':' + s;
  else
    return result = m + ':' + s;
};

export const isUndefined = (val) => {
  return typeof val === 'undefined';
};

/**
 * 限制数值大小
 * @param num
 * @param min
 * @param max
 * @returns {*}
 */
export const limit = (num, min, max) => {
  if (!isUndefined(min))
    num = num < min ? min : num;

  if (!isUndefined(max))
    num = num > max ? max : num;

  return num;
};

