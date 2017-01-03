(function($){
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    document.addEventListener("touchmove", function (e) {
        $(".moonlt-click").on("touchend",function(e){
            e.preventDefault();
        });
        e.preventDefault();
    });

    var total=0,can=false,desc="";
    function storage_img(ele,tar){
        //当图片加载完成的时候触发回调函数
        var elephant = document.getElementById(ele);
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
        elephant.onload = function () {
            imgCanvas.width = elephant.width;
            imgCanvas.height = elephant.height;
            imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
            var imgAsDataURL = imgCanvas.toDataURL(tar);
            try {
                localStorage.setItem(ele, imgAsDataURL);
            } catch (e) {
                console.log("Storage failed: " + e);
            }
        };
    }
    function  weiXincallbak(){
         wx.showOptionMenu();
         wx.checkJsApi({
             jsApiList: [
                 'onMenuShareTimeline',
                 'onMenuShareAppMessage'
             ]
         });
         // 分享朋友
         wx.onMenuShareTimeline({
             title: weixinDate().desc,
             link:  weixinDate().link,
             imgUrl:weixinDate().imgUrl,
             success: function (res) {
                 window.location.reload();
             },
             fail: function (res) {
                 alert('系统错误');
             }
         });
         // 分享朋友圈
         wx.onMenuShareAppMessage({
             title:weixinDate().title,
             desc:weixinDate().desc,
             link: weixinDate().link,
             imgUrl: weixinDate().imgUrl,
             type: 'link',
             success: function (res) {
                 window.location.reload();
             },
             fail: function (res) {
                 alert('系统错误');
             }
         });
         //错误提示
         wx.error(function(res) {
             // alert('wx.error: ' + JSON.stringify(res));
         });
     }
    function weixin(callback){
        //获取微信需要的授权地址
         function getRealUrl() {
             var url = window.location.href;
             if (url.indexOf("#") > 0) {
                 return url.substring(0, url.indexOf("#"));
             } else {
                 return url;
             }
         }
         var dataWeixin = {
             url: getRealUrl()
         };
         $.ajax({
             type: 'post',
             url: 'http://weixin.ufenqi.com/wxc/config/jssdk',
             data: JSON.stringify(dataWeixin),
             dataType: "json",
             xhrFields: {
                 withCredentials: true
             },
             crossDomain: true,
             beforeSend: function (xhr) {
                 // json格式传输，后台应该用@RequestBody方式接受
                 xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
             },
             success: function (resp) {
                 if (resp.resultCode == "0") {
                     wx.config({
                         debug: false,
                         // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                         appId: resp.data.appId,
                         // 必填，公众号的唯一标识
                         timestamp: resp.data.timestamp,
                         // 必填，生成签名的时间戳
                         nonceStr: resp.data.noncestr,
                         // 必填，生成签名的随机串
                         signature: resp.data.signature,
                         // 必填，签名，见附录1
                         jsApiList: [
                             'onMenuShareTimeline',
                             'onMenuShareAppMessage'
                         ]
                     });

                     wx.ready(function () {
                         if (callback != undefined) {
                             callback();
                         }
                     });
                 }
             },
             error: function (resp) {
                 if (typeof(error_callback) != "undefined") {
                     error_callback(resp);
                 }
             }
         });
    }
    function oneCome(){
        var html="";
        storage_img("elephant","image/jpg");
        storage_img("moonHead","image/png");
        if($('body').hasClass('pace-done')){
            var _w=document.body.clientWidth;
            var _h=window.innerHeight;
            storage_img("elephant1","image/jpg");
            storage_img("moonlarge","image/png");
            storage_img("moonltm","image/png");
            storage_img("moonlts","image/png");
            storage_img("moonlight","image/png");
            html='<img src="http://cdn.ufenqi.com/cms/img/moonlt-logo.png" class="moonlt-logo"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/mooncloud.png" class="moonlt-cloud trans5"/>' +
                '<div class="moonback">' +
                '<p class="moonheader">' +
                '<img src="http://cdn.ufenqi.com/cms/img/moonHead.png"/></p>' +
                '<div class="moonbtn">' +
                '<p class="moonbtn-txt"><span class="moonbtn-content">10秒钟内看谁的戳屏次数最多</span><span class="moonbtn-trangle"></span></p>' +
                '<button class="moonbtn-button trans"></button>' +
                '</div>' +
                '</div>';
            $('body').append(html);
            weixin(weiXincallbak);
            clearInterval(comeon_set);
            btnAction();
        }
    }
    function btnAction(){
        $(".moonbtn-button").on('click',function(){
            var _html ="";
            $('.moonback').remove();
            _html='<div class="moonback2"><div class="moon-diaoluo">' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-corn.png" class="moon-corn"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-corn.png" class="moon-corn1"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-corn.png" class="moon-corn2"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-yuebing.png" class="moon-yuebing"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-yuebing.png" class="moon-yuebing1"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-yuebing.png" class="moon-yuebing2"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-yuebing.png" class="moon-yuebing3"/>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moon-yuebing.png" class="moon-yuebing4"/></div>' +
                '<div class="moonback2-content">' +
                '<div class="moonheader2">' +
                '<img src="http://cdn.ufenqi.com/cms/img/moondata.png"/>' +
                '<p class="moonTimeTxt"><span class="moonTime">10.00</span><span class="moon-s">s</span></p>' +
                '</div>' +
                '<div class="moonlt-click">' +
                '<div class="moondata"><span class="moondata-circle"></span><p class="moondata-txt">3</p><span class="moondata-line"></span>' +
                '</div>' +
                '<img src="http://cdn.ufenqi.com/cms/img/moontxt.png" class="moon-warning"/>' +
                '</div>' +
                '</div><p class="moonlt-sml">' +
                '</p>' +
                '</div>';
            $('body').append(_html);
            timeAction();
        })
    }
    function timeAction(){
        var val=3;
        var time = setInterval(function(){
            val--;
            if(val === 0){
                val = 0;
                $(".moondata-txt").text(val);
                clearInterval(time);
                count();
                timeClick();
            }
            $(".moondata-txt").text(val)
        },1000)
    }
    function timeClick(){
        $(".moonlt-click").on('touchend',function(){
            counter();
        })
    }
    function count(){
        var val=1000;
        var counter=setInterval(function(){
            val--;
            if(val === 0.00 ){
                can=false;
                clearInterval(counter);
                $(".moonTime").text('0.00');
                 lastPage();
            }else if(val >= 0.00){
                can=true;
                var res = val/100;
                $(".moonTime").text(res.toPrecision(val.toString().length));
                $(".moonTimeTxt").css('margin-left','-50px');
            }

        },10);
    }
    function counter(){
        if(can){
            total++;
            $(".moondata-txt").html(total+'<span style="font-size:32px">元</span>').addClass('pulse');
            $(".moondata").css({'color':'#fce50b','font-size':'135px'})
                          .children('span.moondata-circle,span.moondata-line').animate({opacity:0},500,'',function(){
                $(this).css('display','none')
            });
            $(".moon-warning").animate({opacity:0},500,'',function(){
                $(this).css('display','none')
            });
            $(".moon-diaoluo").find('img.moon-corn').addClass('diaoluo');
            $(".moon-diaoluo").find('img.moon-corn1').addClass('diaoluo1');
            $(".moon-diaoluo").find('img.moon-corn2').addClass('diaoluo2');
            $(".moon-diaoluo").find('img.moon-yuebing').addClass('diaoluo3');
            $(".moon-diaoluo").find('img.moon-yuebing1').addClass('diaoluo4');
            $(".moon-diaoluo").find('img.moon-yuebing2').addClass('diaoluo5');
            $(".moon-diaoluo").find('img.moon-yuebing3').addClass('diaoluo6');
            $(".moon-diaoluo").find('img.moon-yuebing4').addClass('diaoluo3');
            if(total ==30){
                $('.moonlt-sml').append('<img src="http://cdn.ufenqi.com/cms/img/moonlt-small.png" class="moonlt-s"/>')
            }else if(total == 70){
                $(".moonlt-s").remove();
                $('.moonlt-sml').append('<img src="http://cdn.ufenqi.com/cms/img/moonlt-m.png" class="moonlt-m"/>')
            }else if(total ==120){
                $(".moonlt-m").remove();
                $('.moonlt-sml').append('<img src="http://cdn.ufenqi.com/cms/img/moonlt-large.png" class="moonlt-l"/>')
            }
        }
    }
    function lastPage(){
        $(".moon-diaoluo").find('img.moon-corn').removeClass('diaoluo');
        $(".moon-diaoluo").find('img.moon-corn1').removeClass('diaoluo1');
        $(".moon-diaoluo").find('img.moon-corn2').removeClass('diaoluo2');
        $(".moon-diaoluo").find('img.moon-yuebing').removeClass('diaoluo3');
        $(".moon-diaoluo").find('img.moon-yuebing1').removeClass('diaoluo4');
        $(".moon-diaoluo").find('img.moon-yuebing2').removeClass('diaoluo5');
        $(".moon-diaoluo").find('img.moon-yuebing3').removeClass('diaoluo6');
        $(".moon-diaoluo").find('img.moon-yuebing4').removeClass('diaoluo3');
        $(".moondata").css({'color':'#fce50b','font-size':'135px'})
            .children('span.moondata-circle,span.moondata-line').animate({opacity:0},500,'',function(){
            $(this).css('display','none')
        });
        $(".moon-warning").animate({opacity:0},500,'',function(){
            $(this).css('display','none')
        });
        $('.moonheader2').animate({opacity:0},500,function(){
            $(this).css('visibility','hidden')
        });
        $('.moondata-txt').removeClass('pulse').addClass('moonlast-txt').children('span').css('font-size','28px');
        $(".moonlt-sml").animate({opacity:0},500,'',function(){
            $(this).css('display','none')
        });;
        var html1="";
        var status="";
        if(total >=0 && total <= 30){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"手癌晚期\"的称号,你还等什么呢!";
            status="http://cdn.ufenqi.com/cms/img/moon-status1.png"
        }else if(total >30 && total <= 70){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"战五渣\"的称号,你还等什么呢!";
            status="http://cdn.ufenqi.com/cms/img/moon-status2.png"
        }else if(total >70 && total <= 120){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"霸气外露\"的称号,你还等什么呢!";
            status="http://cdn.ufenqi.com/cms/img/moon-status3.png"
        }else if(total > 120){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"洪荒之力\"的称号,你还等什么呢!";
            status="http://cdn.ufenqi.com/cms/img/moon-status4.png"
        }
        html1='<p class="moonlast-header">' +
            '<img src=\"'+status+'\" class="moon-status lightSpeedIn" id="moon-status"/>'+
           '<img src="http://cdn.ufenqi.com/cms/img/moonlight-header.png" class="bounceIn2"/></p>' +
            '<div class="moonlast-bottom">' +
            '<button class="moonlast-appdown bounceIn"></button>' +
            '<button class="moonlast-again bounceIn1"></button></div>';
        $(".moonback2").append(html1);
        appdownNow();
        aginPlay();
        weixin(weiXincallbak);
        document.getElementById('moon-status').addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            this.className = this.className.replace('lightSpeedIn', 'swing');
            console.log(2);
        }, false);
        document.querySelector(".moonlast-appdown").addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            this.className = this.className.replace('bounceIn', 'trans');
            console.log(2);
        }, false);
        document.querySelector('.moonlast-again').addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            this.className = this.className.replace('bounceIn1', 'trans1');
            console.log(2);
        }, false);
    }
    function weixinDate(){
        if(total==0){
            desc="我在中秋大作战，你在哪里？和我一起来释放洪荒之力吧！";
        }else if(total >0 && total <= 30){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"手癌晚期\"的称号,你还等什么呢!";
        }else if(total >30 && total <= 70){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"战五渣\"的称号,你还等什么呢!";
        }else if(total >70 && total <= 120){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"霸气外露\"的称号,你还等什么呢!";
        }else if(total > 120){
            desc="我在中秋大作战10秒戳了"+total+"元,荣获\"洪荒之力\"的称号,你还等什么呢!";
        }
        var data={
            title:"中秋大作战丨10s戳出你的中秋洪荒之力【优分期】",
            link:"http://cdn.ufenqi.com/cms/img/MidAutumn.html",
            imgUrl:"http://cdn.ufenqi.com/cms/img/moonweixin.jpg",
            desc:desc
        };
        return data;
    }
    function appdownNow(){
        $(".moonlast-appdown").on('click',function(){
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ufenqi.app';
        })
    }
    function aginPlay(){
        $(".moonlast-again").on('click',function(){
            window.location.href="http://cdn.ufenqi.com/cms/img/MidAutumn.html"
        })
    }
    var comeon_set = setInterval(oneCome,50);
})(jQuery);