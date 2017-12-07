$(function(){
    // $('button[type=submit]').click(function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         url:"/employee/employeeLogin",
    //         data:$("form").serialize(),
    //         type:'post',
    //         success:function(backData){
    //             console.log(backData);
    //         }
    //     })
    // })
   //使用表单校验插件
$('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 30,
            message: '用户名长度必须在3到30之间'
          },
          callback :{
              message:'账号错误！'
          }
          //正则校验
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到16之间'
          },
          callback: {
              message:'密码错误！'
          }
          //正则校验
        }
      },
    }
  
  });


}).on('success.form.bv', function (e) {
    e.preventDefault();
    // 在开始点击时 出现进度条
    NProgress.start(); //开启进度条

    //使用ajax提交逻辑
    $.ajax({
        url:"/employee/employeeLogin",
        data:$('form').serialize(),
        type:'post',
        success:function(backData){
            // console.log(backData.error);

            // 修改选择器
            var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
            if(backData.success){
                window.location.href = '../manage/index.html'
            }else{
                if(backData.error == 1000){
                  // 参数：1 要出现提示的输入行   2 在什么时候出现提示   3 提示的内容是什么
                    validator.updateStatus('username','INVALID','callback');
                }else if(backData.error == 1001){
                    // validator.updateStatus('password','INVALID','callback');
                    validator.updateStatus('password','INVALID','callback');
                }
            }

            // 判断结果出来后 进度条到头 收起
            NProgress.done(); //收起进度条
        }
    })
});


// 重置按钮添加重置功能
$('button[type=reset]').click(function(){
  var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
  validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
})