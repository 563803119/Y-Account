window.onload = function () {

    //微信分享  http://jomalonetrxmas.ibluesocial.com/jomalone/api/wechat/auth

    $.get("http://jomalonetrxmas.ibluesocial.com/jomalone/api/wechat/auth", {
        url: window.location.href
    },function (data) {
        if (data && data.code == 0) {
            var config_data = Object.assign({
                debug: false,
                jsApiList: ["checkJsApi", "onMenuShareAppMessage", "onMenuShareTimeline"]
            }, data.data)
            wx.config(config_data)

            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: "手工经典藏新意",
                    desc: "以匠心，致初心",
                    link: "http://thebalvenie.ibluesocial.com/",
                    imgUrl: "http://thebalvenie.ibluesocial.com/static/imagesv8/share.jpg",
                    success: function () {
                        // alert("分享朋友成功")
                    }
                })
                wx.onMenuShareTimeline({
                    title: "手工经典藏新意",
                    link: "http://thebalvenie.ibluesocial.com/",
                    imgUrl: "http://thebalvenie.ibluesocial.com/static/imagesv8/share.jpg",
                    success: function () {
                        // alert("分享朋友圈成功")
                    }
                })
            })
            wx.error(function (res) {
                console.log("onError: " + JSON.stringify(res))
            })
        }
    });

    document.documentElement.style.fontSize = window.innerHeight * 2.582 / 100 + "px";

    // 全景图-陀螺仪
    var tuoluo = false;//阻止事件监听
    function borderLeft(direction) {
        // if($(".big-bg").is(":animated")){
        //     $(".big-bg").stop(false,true).animate();
        // }
        var full_bgimgW = ($(".bg-img").width() - $(window).width() * (parseInt(direction))) / 2;
        $(".big-bg").css({
            'left': full_bgimgW + 'px'
        });
    }


    var o = new Orienter();
    function deviceorientation() {
        var initLeft = -($(".big-bg").width() - $(window).width()) / 2;
        $(".big-bg").css({
            'left': initLeft + 'px'
        });
        // 全景图-陀螺仪
        var flag = true;
        var firstAngle = 0;//
        var instance = 0;
        var preAngle = 0;

        o.onOrient = function (obj) {

                var longitude = obj.lon;

                var alpha = obj.a,
                    beta = obj.b,
                    gamma = obj.g;


                // alert(longitude)
                // var longitude = event.longitude,
                //     beta = event.beta,
                //     gamma = event.gamma;

                // if (Math.abs(longitude - preAngle) < 2) {
                //     return;
                // }
                //longitudeZ轴  [0, 360);beta X轴  [-180, 180);gamma Y轴 [-90, 90)
                if (flag) {
                    if (longitude == 0 || longitude == 360 || longitude == 30) {
                        return;
                    }
                    firstAngle = longitude; //记录第一次值;
                    flag = false;
                }

                // preAngle = longitude;


                var full_bgimgW = ($(".big-bg").width() - $(window).width()) / (2 * 60); //每一度移动距离
                var translateZ = parseInt(Math.round(instance) * full_bgimgW) + initLeft; //instance移动的度数


                /*1.根据初始值firstAngle，角度位置判断*/
                if (firstAngle > 90 && firstAngle < 270) {
                    /*2.根据偏移角度大于90度，判断*/
                    if (longitude - firstAngle > 60) {
                        borderLeft(1);
                        // return false
                    } else if (longitude - firstAngle < -60) {
                        borderLeft(-1);
                        // return false
                    } else {
                        if (longitude > firstAngle) {
                            instance = Math.abs(longitude - firstAngle);
                        } else {
                            instance = longitude - firstAngle;
                        }
                    }
                } else if (firstAngle < 90 && firstAngle > 0) {
                    /*根据longitude当前位置，225度为临界点，判断*/
                    if (longitude > firstAngle && longitude < 225) {
                        if (longitude - firstAngle > 60) {
                            borderLeft(1);
                            // return false
                        } else {
                            instance = Math.abs(longitude - firstAngle);
                        }
                    } else if (longitude < firstAngle && longitude > 0) {
                        if (longitude - firstAngle < -60) {
                            borderLeft(-1);
                            // return false
                        } else {
                            instance = Math.abs(longitude - firstAngle) * (-1);
                        }
                    } else if (longitude < 360 && longitude > 225) {
                        if ((longitude - 360 - firstAngle) < -60) {
                            borderLeft(-1);
                            // return false
                        } else {
                            instance = Math.abs(longitude - 360 - firstAngle) * (-1);
                        }
                    }
                } else if (firstAngle < 360 && firstAngle > 270) {
                    /*根据longitude当前位置，135度为临界点，判断*/
                    if (longitude < firstAngle && longitude > 135) {
                        if (longitude - firstAngle < -60) {
                            borderLeft(-1);
                            // return false
                        } else {
                            instance = Math.abs(longitude - firstAngle) * (-1);
                        }
                    } else if (longitude > firstAngle && longitude < 360) {
                        if ((longitude - firstAngle) > 60) {
                            borderLeft(1);
                            // return false
                        } else {
                            instance = Math.abs(longitude - firstAngle);
                        }
                    } else if (longitude < 135 && longitude > 0) {
                        if ((360 - firstAngle + longitude) > 60) {
                            borderLeft(1);
                            // return false
                        } else {
                            instance = Math.abs(360 - firstAngle + longitude);
                        }
                    }
                }

                translateZ = parseInt(Math.round(instance) * full_bgimgW) + initLeft;
                if($(".big-bg").is(":animated")){
                    $(".big-bg").stop(false,true).animate();
                }
                // $(".big-bg").css({
                //     'left': translateZ + 'px'
                // });
                $(".big-bg").animate({'left': translateZ + 'px'},instance*30,function(){});

        };
        o.init();

        // if (window.DeviceOrientationEvent) {
        //     window.addEventListener('deviceorientation', function (event) {
        //         if (tuoluo) {
        //             var alpha = event.alpha,
        //                 beta = event.beta,
        //                 gamma = event.gamma;
        //
        //             if (Math.abs(alpha - preAngle) < 2) {
        //                 return;
        //             }
        //
        //             //alphaZ轴  [0, 360);beta X轴  [-180, 180);gamma Y轴 [-90, 90)
        //             if (flag) {
        //                 if (alpha == 0 && beta == 0 && gamma == 0) {
        //                     return;
        //                 }
        //                 firstAngle = alpha; //记录第一次值;
        //                 flag = false;
        //             }
        //             preAngle = alpha;
        //
        //
        //             var full_bgimgW = ($(".big-bg").width() - $(window).width()) / (2 * 45); //每一度移动距离
        //             var translateZ = parseInt(Math.round(instance) * full_bgimgW) + initLeft; //instance移动的度数
        //
        //
        //             /*1.根据初始值firstAngle，角度位置判断*/
        //             if (firstAngle > 90 && firstAngle < 270) {
        //                 /*2.根据偏移角度大于90度，判断*/
        //                 if (alpha - firstAngle > 45) {
        //                     borderLeft(1);
        //
        //                 } else if (alpha - firstAngle < -45) {
        //                     borderLeft(-1);
        //                 } else {
        //                     if (alpha > firstAngle) {
        //                         instance = Math.abs(alpha - firstAngle);
        //                     } else {
        //                         instance = alpha - firstAngle;
        //                     }
        //                 }
        //             } else if (firstAngle < 90 && firstAngle > 0) {
        //                 /*根据alpha当前位置，225度为临界点，判断*/
        //                 if (alpha > firstAngle && alpha < 225) {
        //                     if (alpha - firstAngle > 45) {
        //                         borderLeft(1);
        //                     } else {
        //                         instance = Math.abs(alpha - firstAngle);
        //                     }
        //                 } else if (alpha < firstAngle && alpha > 0) {
        //                     if (alpha - firstAngle < -45) {
        //                         borderLeft(-1);
        //                     } else {
        //                         instance = Math.abs(alpha - firstAngle) * (-1);
        //                     }
        //                 } else if (alpha < 360 && alpha > 225) {
        //                     if ((alpha - 360 - firstAngle) < -45) {
        //                         borderLeft(-1);
        //                     } else {
        //                         instance = Math.abs(alpha - 360 - firstAngle) * (-1);
        //                     }
        //                 }
        //             } else if (firstAngle < 360 && firstAngle > 270) {
        //                 /*根据alpha当前位置，135度为临界点，判断*/
        //                 if (alpha < firstAngle && alpha > 135) {
        //                     if (alpha - firstAngle < -45) {
        //                         borderLeft(-1);
        //                     } else {
        //                         instance = Math.abs(alpha - firstAngle) * (-1);
        //                     }
        //                 } else if (alpha > firstAngle && alpha < 360) {
        //                     if ((alpha - firstAngle) > 45) {
        //                         borderLeft(1);
        //                     } else {
        //                         instance = Math.abs(alpha - firstAngle);
        //                     }
        //                 } else if (alpha < 135 && alpha > 0) {
        //                     if ((360 - firstAngle + alpha) > 45) {
        //                         borderLeft(1);
        //                     } else {
        //                         instance = Math.abs(360 - firstAngle + alpha);
        //                     }
        //                 }
        //             }
        //
        //             translateZ = parseInt(Math.round(instance) * full_bgimgW) + initLeft;
        //             $(".big-bg").css({
        //                 'left': translateZ + 'px'
        //             });
        //
        //         }
        //     }, false);
        // } else {
        //     document.querySelector('body').innerHTML = '你的浏览器不支持陀螺仪';
        // }
    }



    //加载图片
    var base_url = './static/imagesv8/';
    var src_arr = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png',
        'p0.jpg', 'p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg', 'p6.jpg',
        'bg.jpg', 'buy.png'];

    var full_wine_h = $('.full-wine').height();
    var full_wine_h_rate = full_wine_h / 100;
    var index = 0;
    for (var i = 0; i < src_arr.length; i++) {
        var img = document.createElement('img');
        img.src = base_url + src_arr[i];
        img.onload = function () {
            index++;
            show_rate((index / src_arr.length) * 100);
        }
        img.onerror = function () {
            index++;
            show_rate((index / src_arr.length) * 100);
        }
    }

    //显示加载动画
    function show_rate(precent) {
        if (precent >= 100) {

            setTimeout(function () {
                $('.loadding-container').css({
                    'display': 'none'
                });
                $('.view').css({
                    'opacity': 1
                });
                deviceorientation();
            }, 1000)
        }
        $('.full-wine').css({
            "clip": "rect(" + (full_wine_h - precent * full_wine_h_rate) + "px auto auto auto)"
        })
    }


    var mySwiper = new Swiper('.swiper-container', {
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    var isModalShow = false;
    var oneModalShow = false;
    var buyModalShow = false;
    var isShowForm = false;
    var textFormModal = false;

    function showModal(boolean, dom) {
        if (boolean) {
            document.getElementsByClassName(dom)[0].style.display = 'block';
            document.getElementsByClassName(dom)[0].style.opacity = 1;
        } else {
            document.getElementsByClassName(dom)[0].style.display = 'none';
            document.getElementsByClassName(dom)[0].style.opacity = 0;
        }
    }


    showModal(isModalShow, 'swiper-modal');
    showModal(oneModalShow, 'one-modal');
    showModal(buyModalShow, 'buy-modal');
    showModal(isShowForm, 'form-modal');
    showModal(textFormModal, 'form-modal-text');

    //show
    $('.p0-img').click(function () {
        oneModalShow = true;
        showModal(oneModalShow, 'one-modal');
    })

    $('body').on('click', '.p-img', function () {
        var num = parseInt(this.dataset.id) - 1;
        isModalShow = true;
        showModal(isModalShow, 'swiper-modal');
        mySwiper.slideTo(num);
    })

    $('.buy-img').click(function () {
        buyModalShow = true;
        showModal(buyModalShow, 'buy-modal');
    })

    $('.form-img').click(function () {
        isShowForm = true;
        showModal(isShowForm, 'form-modal');
    })

    $('.prize-btn').click(function () {

        var username = $('.username').val();
        var phone_num = $('.phone-num').val();

        textFormModal = true;
        showModal(textFormModal, 'form-modal-text');
        $('.text').html('')
        if ($.trim(username) == '' || $.trim(phone_num) == '') {
            $('.text').html('名字或者手机号不能为空')
        } else if (!(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(phone_num))) {
            $('.text').html('请输入正确的手机号')
        } else {

            isShowForm = false;
            showModal(isShowForm, 'form-modal');

            var param={
                name: username,
                mobile: phone_num
            }
            $.ajax({
                type: "POST",
                url: "http://thebalvenie.ibluesocial.com/thebalvenie/api/prize_info",
                data:JSON.stringify(param),
                dataType: "json",
                success: function(data){
                    console.log(data);
                    if(data.code == 8801){
                        $('.text').html('该手机号已被使用')
                    }else if(data.code == 0){
                        $('.text').html('您已成功参加抽奖活动, <br>获奖情况于11月30号公众号公布。')
                    }
                },error:function (e) {
                    $('.text').html('网络连接错误')
                }
            });

        }

    })


    //hide
    $('.modal-bg').click(function (e) {
        isModalShow = false;
        showModal(isModalShow, 'swiper-modal');
    })

    $('.one-modal-bg').click(function (e) {
        oneModalShow = false;
        showModal(oneModalShow, 'one-modal');
    })

    $('.buy-modal-bg').click(function () {
        buyModalShow = false;
        showModal(buyModalShow, 'buy-modal');
    })

    $('.form-modal-bg').click(function () {
        isShowForm = false;
        showModal(isShowForm, 'form-modal');

    })

    $('.form-modal-text-bg').click(function () {
        textFormModal = false;
        showModal(textFormModal, 'form-modal-text');
    })
}