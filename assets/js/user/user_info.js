$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符！'
            }
        }
    })

    initUserInfo();

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('获取用户信息失败');
                }
                // console.log(res);
                // 调用 form.val(lay-filter, data)快速为表单赋值,lay-filter为form表单的属性，表示指向该表单
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置按钮
    $('#btnReset').click(function(e) {
        e.preventDefault();
        // 通过调用POST请求的函数，实现重置
        initUserInfo();
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 通过index.js中的 getUserInfo()方法重新渲染主页面
                // 子页面中调用父页面的函数 window.parent
                window.parent.getUserInfo();
            }
        })
    })

})