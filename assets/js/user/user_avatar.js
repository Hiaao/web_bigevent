$(function () {
    var layer = layui.layer


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 上传图片功能
    $('#btnChooseImage').click(function () {
        $('#file').click();
    })

    // 为文件选择框绑定chanage事件，更换裁剪区图片
    $('#file').on('change', function (e) {
        let filelist = e.target.files
        // filelist.length当上传文件后会有长度加1
        if (filelist.length === 0) {
            return layer.msg('请选择照片')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0];

        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)

        // 3. 初始化采集拿去
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 上传头像功能
    $('#btnUpload').click((e) => {
        // 1. 拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2. 调用接口
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})

