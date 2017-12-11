$(function () {
    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(data){          // console.log(data);        
            if(data.error == 400){
                window.location.href = './login.html';
            }else{
                $('.management li').on('click',function(){
                    $('.management li').removeClass('active');
                    $(this).addClass('active');
                })
            
                
            
                    // 菜单显示和隐藏
                    $('.MenuBar').on('click',function(){
                        $('#homePage>.less').toggle();
                        $('#homePage>.right').toggleClass('quanPing');
                        
                       
                    })
    
                    // 退出登录
                    $('.Exit').on('click',function(){
                        // 显示出模态框
                        $('.myModal').modal('show');
                    })

                    // 点击 “确定” 退出登录状态  跳转到登录页 
                    $('.exit-register').on('click',function(){
                        $.ajax({
                            url:'/employee/employeeLogout',
                            success:function(data){
                                console.log(data);
                                    window.location.href = './login.html';
                            }
                        })
                    })


                    // 增加分类
                    $('.addListing').on('click',function(){
                        // console.log(666);
                        $('.addListing-modal').modal('show');
                    })

            }
        }

    })

    
    })