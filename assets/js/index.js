$(function () {
    // 调用
    getUserInfo();

    var layer = layui.layer

    // 退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出弹窗，点击确定触发回调函数
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')

            // 2. 重新跳转到登录界面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

// 获取用户基本的信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // // 请求头配置对象，用于JWT身份认证
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用该函数渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功或者失败最终都会调用 complete
        // complete: function(res) {
        //     // complete中可以使用res.responseJSON拿到响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！');
        //     // 1. 清空 token
        //     localStorage.removeItem('token')

        //     // 2. 强制跳转到登录
        //     location.href = '/login.html'

        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称并设置
    // 通过 || 判断用户是否有 nickname，有则使用nickname
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 优先渲染图片头像，其次文本头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        // 获取到名字第一个字符作为头像
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}