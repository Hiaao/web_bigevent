$(function () {
    // 注册点击事件，点击切换显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 登录点击事件，点击切换显示
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 通过layui获取form对象
    let form = layui.form
    // 通过form.verify()法定义校验规则
    form.verify({
        // 自定义了一个叫pass的校验规则
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致 value为表单的值
        repass: function(value) {
            if($('#pwdA').val() != value) {
                return '两次密码不一致'
            }
        }
    })

    // layer 用于弹窗提示
    var layer = layui.layer


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) { 
        // 1. 阻止默认提交行为
        e.preventDefault();
        // 2. 发起POST请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录');
                // 成功后模拟点击自动跳转到登录界面
                $('#link_login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功的 token字符串 保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})