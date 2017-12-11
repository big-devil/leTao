$(function () {
    $.ajax({
        url: '/employee/checkRootLogin',
        success: function (data) { // console.log(data);        
            if (data.error == 400) {
                window.location.href = './login.html';
            } else {
                $('.management li').on('click', function () {
                    $('.management li').removeClass('active');
                    $(this).addClass('active');
                })



                // 菜单显示和隐藏
                $('.MenuBar').on('click', function () {
                    $('#homePage>.less').toggle();
                    $('#homePage>.right').toggleClass('quanPing');


                })

                // 退出登录
                $('.Exit').on('click', function () {
                    // 显示出模态框
                    $('.myModal').modal('show');
                })

                // 点击 “确定” 退出登录状态  跳转到登录页 
                $('.exit-register').on('click', function () {
                    $.ajax({
                        url: '/employee/employeeLogout',
                        success: function (data) {
                            console.log(data);
                            window.location.href = './login.html';
                        }
                    })
                })


                // 增加分类
                $('.addListing').on('click', function () {
                    // console.log(666);
                    $('.addListing-modal').modal('show');
                })

                // 表格商品渲染
                var myPage = 1;
                var myPageSize = 5;

                function Ajax() {
                    $.ajax({
                        url: '/product/queryProductDetailList',
                        data: {
                            page: myPage,
                            pageSize: myPageSize
                        },
                        success: function (data) {
                            console.log(data);
                            // console.log(123);
                            $('tbody').html(template('formData', data));

                            // 分页插件
                            $('.pagintor-product').bootstrapPaginator({
                                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                                currentPage: myPage, //当前页
                                totalPages: Math.ceil(data.total / data.size), //总页数
                                size: "normal", //设置控件的大小，mini, small, normal,large
                                onPageClicked: function (event, originalEvent, type, page) {
                                    //为按钮绑定点击事件 page:当前点击的按钮值
                                    myPage = page;

                                    Ajax();
                                }
                            });
                        }
                    })
                }
                //  初始调用一次
                Ajax();

                // 上传文件添加上传方法   插件

                var picList = [];
                $('.form-group .uploadPictures').fileupload({
                    dataType: 'json',
                    done: function (e, data) {
                         console.log(data);
                        // $('<img style="width:100px;"src="'+data.result.picAddr+'"/>').appendTo('form .form-group:last');
                        $(this).parent().parent().next().append('<img style="width:100px;"src="'+data.result.picAddr+'"/>');
                        picList.push(data.result);
                        if(picList.length == 3){
                            console.log(333);
                            $("#form").data('bootstrapValidator').updateStatus('pic', 'VALID');
                        }
                    }


                })

                $('.form-group .uploadPictures').click(function(event){
                    if($('form .form-group:last img').length == 3){
                        // 图片上传三张后 停止上传
                        event.preventDefault();    
                    }
                })

                $('form .form-group:last').on('dblclick','img',function(){
                    // 双击图片后  删除双击后的这张图片
                    // console.log('双击666');
                    $(this).remove();
                })

                //使用表单校验插件
                $('form').bootstrapValidator({
                    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
                    excluded: [':disabled'],

                    //2. 指定校验时的图标显示，默认是bootstrap风格
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },

                    //3. 指定校验字段
                    fields: {
                        //校验用户名，对应name表单的name属性
                        proName: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品名称不能为空'
                                },

                            }
                        },
                        proDesc: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品描述不能为空'
                                },

                            }
                        },
                        num: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品库存不能为空'
                                },

                            }
                        },
                        price: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品价格不能为空'
                                },

                            }
                        },
                        oldPrice: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品原价不能为空'
                                },

                            }
                        },
                        size: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '商品尺码不能为空'
                                },

                            }
                        },
                        pic: {
                            validators: {
                                //不能为空
                                notEmpty: {
                                    message: '上传图片不能为空'
                                },

                            }
                        },
                    }

                }).on('success.form.bv', function (e) {
                    // 表单验证成功之后 调用
                    // console.log('666');
                    e.preventDefault();

                    // 上传图片
                    $.ajax({
                        url:'/product/addProduct',
                        data:$('form').serialize(),
                        type:'post',
                        success:function(){
                            // 添加到数据库  重新渲染
                            Ajax();

                            // 点击提交之后 清空表单内容  表单框收起
                            // 清空表单内容
                            $('form input').val('');
                            // 清除多行文本框内容
                            $('form textarea').val('');
                            $('form .form-group:last').text('');

                            $("#form").data('bootstrapValidator').resetForm();
                            // 表单框收起
                            $('.addListing-modal').modal('hide');


                        }
                    })
                });


            }
        }

    })



})