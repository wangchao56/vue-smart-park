//tokenkey
export const TOKEN_KEY = 'token';


/**
 *  设置token 到本地
 * @param token  token  
 */
export const setTokenToLocal = (token: string) => {
    localStorage
        .setItem(TOKEN_KEY, token);
}

/**
 * 从本地获取token
 */
export const getTokenFromLocal = () => {
    return localStorage.getItem(TOKEN_KEY);
}
/**
 *  删除本地token
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}


/**
 * 向cookie中设置token 并设置过期时间
 */
export const setTokenToCookie = (token: string, expires: number) => {
    const date = new Date();
    date.setTime(date.getTime() + expires);
    document.cookie = `token=${token};expires=${date.toUTCString()}`;
}


/**
 * 从cookie中获取token
 */
export const getTokenFromCookie = () => {
    const cookie = document.cookie;
    const cookieArr = cookie.split(';');
    let token = '';
    cookieArr.forEach((item) => {
        if (item.indexOf('token') > -1) {
            token = item.split('=')[1];
        }
    })
    return token;
}

/**
 * 从cookie中删除token
 */
export const removeTokenFromCookie = () => {
    document.cookie = `token=;expires=${new Date(0).toUTCString()}`;
}   
