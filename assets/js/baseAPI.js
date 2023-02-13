// 注：每次调用 get post ajax时会先调用 ajaxPrefilter函数
// 该函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 直接将路径拼接，当需要使用路径时，直接调用
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    return options.url;
})