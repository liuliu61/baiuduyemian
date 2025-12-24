//var wzck_host = 'https://api.123weizhushou.com';//正式
// var wzck_host = 'http://char.gaorenyazhi.com';//测试
 //var wzck_host = 'http://192.168.3.178:8080';//本地
//var wzck_dl_host = 'https://sso.123weizhushou.com';

var source = '推广';

var isBd_ocpx = true;

//套餐列表
var wzck_kbbk_ktfw_list = [
    {
		id: 300005,
		name: '蓝V认证',
		time: '终身',
		price: 399,
		oldprice: 399*2
	},
    {
		id: 300006,
		name: '蓝v认证 + 线索留资',
		time: '终身',
		price: 599,
		oldprice: 599*2
	},
    {
		id: 300007,
		name: '蓝v认证 + 商城',
		time: '终身',
		price: 999,
		oldprice: 999*2
	},
    {
		id: 300008,
		name: '蓝v认证 + 团购',
		time: '终身',
		price: 1299,
		oldprice: 1299*2
	},
    {
		id: 300009,
		name: '蓝v认证 + 线索留资 + 商城 + 团购',
		time: '终身',
		price: 1699,
		oldprice: 1699*2
	},
    // {
	// 	id: 300000,
	// 	name: '抖店开通+搭建服务',
	// 	time: '终身',
	// 	price: 296,
	// 	oldprice: 296*2
	// },
	// {
	// 	id: 300001,
	// 	name: '抖店开通+永久蓝v+搭建服务',
	// 	time: '终身',
	// 	price: 596,
	// 	oldprice: 596*2
	// }, {
	// 	id: 300002,
	// 	name: '抖店开通+永久蓝v+门店入驻+开通团购+搭建服务',
	// 	time: '终身',
	// 	price: 796,
	// 	oldprice: 796*2
	// }, {
	// 	id: 300003,
	// 	name: '抖店开通+永久蓝v+门店入驻+开通团购+会员营销系统+搭建服务',
	// 	time: '终身',
	// 	price: 1296,
	// 	oldprice: 1296*2
	// }, {
	// 	id: 300004,
	// 	name: '抖店开通+永久蓝v+门店入驻+开通团购+会员营销系统+分销带货+搭建服务',
	// 	time: '终身',
	// 	price: 1696,
	// 	oldprice: 1696*2
	// }
];

// // 网页文本注入
$.ajax({
	url: wzck_host + "/open/api/get_icp",
	type: "post",
	data: {
		domain:window.location.host
	},
	success: function(r) {
		if(r.data) {
			$('.footer').html('<img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/gab.png" style="width: 18px;margin-bottom: -4px;" /><img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/icp.png" style="width: 18px;margin: 0 10px;margin-bottom: -4px;" />Copyright©'+new Date().getFullYear()+" <a href='http://beian.miit.gov.cn' style='color:#929799;'>"+(r.data.icpNum || '') + '</a>' + r.data.companyName + '&版权所有 盗版必究');
			$('.wzck_footer_bot').html('<img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/gab.png" style="width: 18px;margin-bottom: -4px;" /><img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/icp.png" style="width: 18px;margin: 0 10px;margin-bottom: -4px;" />Copyright©'+new Date().getFullYear()+" <a href='http://beian.miit.gov.cn' style='color:#929799;'>"+(r.data.icpNum || '')+'</a> &版权所有 盗版必究 '+r.data.companyName);
			$(".app_xieyi_name").html(r.data.companyName);
	        $(".app_xieyi_names").html(r.data.companyName);
	        localStorage.setItem("platform", r.data.platform);
		} else {
			$('.footer').html('<img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/gab.png" style="width: 18px;margin-bottom: -4px;" /><img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/icp.png" style="width: 18px;margin: 0 10px;margin-bottom: -4px;" />Copyright©'+new Date().getFullYear()+'<a href="http://beian.miit.gov.cn"></a> &版权所有 盗版必究 ');
			$('.wzck_footer_bot').html('<img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/gab.png" style="width: 18px;margin-bottom: -4px;" /><img src="https://wzck-1252188577.cos.ap-beijing.myqcloud.com/www/icp.png" style="width: 18px;margin: 0 10px;margin-bottom: -4px;" />Copyright©'+new Date().getFullYear()+'<a href="http://beian.miit.gov.cn"></a> &版权所有 盗版必究 ');
	    }
	}
});

function goTop() {
	$("html,body").animate({
		"scrollTop": 0
	}, 300)
}

$(document).ready(function() { //在文档加载完毕后执行
	$(window).scroll(function() { //开始监听滚动条
		scrollfun()
	})
})

scrollfun();
function scrollfun(){
	//获取当前滚动条高度
	var topp = $(document).scrollTop();
	//用于调试 弹出当前滚动条高度
	//alert(topp);
	//判断如果滚动条大于90则弹出 "ok"
	if(topp > 600) {
		$('.biaoti').css('bottom', '0px');
		$('.wzck_lbbkefu_box_bot').css('display', 'block');
	} else {
		$('.biaoti').css('bottom', '-100px');
		$('.wzck_lbbkefu_box_bot').css('display', 'none');
	}
}