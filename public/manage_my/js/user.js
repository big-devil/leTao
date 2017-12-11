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
            
            
                    $('.exit-register').on('click',function(){
                        $.ajax({
                            url:'/employee/employeeLogout',
                            success:function(data){
                                console.log(data);
                                
                                    window.location.href = './login.html';
                                
                            }
                        })
                    })
            }
        }

    })

    
    })