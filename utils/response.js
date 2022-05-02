/**
 * 取得 http 回傳的內容
 * @param {boolean} success 是否為成功類型
 * @param {string|array} data 回傳的內容
 * @returns {object} http 回傳的內容
 */
const getHttpResponseContent = ({ success = true, data } = {}) => {
  const result = { status: success ? 'success' : 'error' };
  if (data) result[success ? 'data' : 'message'] = data;
  return result;
};

/**
 * 取得錯誤欄位的回傳
 * @param {string} field 欄位
 * @param {string} message 錯誤訊息
 * @returns {object}
 */
const getErrorMessage = ({ field, message }) => {
  const result = { errors: {} };
  if (field) result.errors[field] = { message };
  return result;
};

module.exports = {
  getHttpResponseContent,
  getErrorMessage,
};
