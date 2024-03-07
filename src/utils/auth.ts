/**
 *  设置token 到本地
 * @param token  token  
 */
export const setTokenToLocal = (token: string) => {
    localStorage
    .setItem('token', token);
}

/**
 *  删除本地token
 */
export const removeToken = () => {
    localStorage.removeItem('token');
}
