/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';
