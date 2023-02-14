// 注：每次调用 get post ajax时会先调用 ajaxPrefilter函数
// 该函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 直接将路径拼接，当需要使用路径时，直接调用
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为需要权限的接口设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局同意挂载 complete 回调函数
    options.complete = function (res) {
        // complete中可以使用res.responseJSON拿到响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 清空 token
            localStorage.removeItem('token')

            // 2. 强制跳转到登录
            location.href = '/login.html'
        };

    }
})