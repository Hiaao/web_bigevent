$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须为6到12位，且不能出现空格'],

        samePwd: function (value) {
            if($('[name=oldPwd]').val() === value) {
                return '新旧密码不能相同！'
            }
        },

        rePwd: function (value) {
            if($('[name=newPwd]').val() !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 请求修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // form标签的 [0]将jquery转化为dom对象 reset方法重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})