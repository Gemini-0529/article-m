/**
 * 本地存储封装模块
 */

export const setItem = (name,value) => {
    //如果value是对象，转为json字符串再传进去
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    //放到try中：如果data不是json字符串，就没必要转成js对象，直接return
    try {
        return JSON.parse(data)
    } catch {
        return data
    }
}
export const removeItem = name => {
    window.localStorage.removeItem(name)
}