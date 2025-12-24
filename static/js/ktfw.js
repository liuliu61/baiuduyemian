//订单套餐id
var wzck_kbbk_ktfw_id = "";
var orderNoStatusNum = 60;
//默认选择的套餐
zxktfw_b(0);
var dytgShowModal = false; // 弹窗
var isdytgShowModal = false; // 弹窗
setTimeout(function () {
	if (!isdytgShowModal) {
		isdytgShowModal = true;
		$(".dytg_showModal_bg").css("display", "flex");
		setTimeout(function () {
			if ($(".wzck_kbbk_ktbg").css("display") == "none" && $(".dytg_showModal_bg").css("display") == "flex") {
				$(".dytg_showModal_bg").css("display", "none");
				$(".wzck_kbbk_ktbg").css("display", "flex");
				// 确认服务
				$("#wzck_kbbk_qrxx").css("display", "block");
				// 实时开通
				$("#wzck_kbbk_sskt").css("display", "none");
				//回显手机号
				if (localStorage.getItem("TgDytgData")) {
					var orderData = JSON.parse(localStorage.getItem("TgDytgData"));
					$("#wzck_kbbk_phone2").val(orderData.applyMobile);
				}
                let phone = $("#banner_phone").val();
                let regexp1 = /^1\d{10}$/;
                if (phone && regexp1.test(phone)) {
                    $("#wzck_kbbk_phone2").val(phone);
                }
				let subject = $(this).attr("data-subject");
				if (subject) {
					$(".sqbb_box_a").removeClass("qrxx_nav_boxac");
					$(".sqbb_box_a[data-subject=" + subject + "]").addClass("qrxx_nav_boxac");
				}
			}
		}, 5000);
	}
}, 5000);
// 打开开通服务
$(".ktfw").click(function () {
	isdytgShowModal = true;
	$(".dytg_showModal_bg").css("display", "none");
	$(".wzck_kbbk_ktbg").css("display", "flex");
	// 确认服务
	$("#wzck_kbbk_qrxx").css("display", "block");
	// 实时开通
	$("#wzck_kbbk_sskt").css("display", "none");
	//回显手机号
	if (localStorage.getItem("TgDytgData")) {
		var orderData = JSON.parse(localStorage.getItem("TgDytgData"));
		$("#wzck_kbbk_phone2").val(orderData.applyMobile);
	}
    let phone = $("#banner_phone").val();
    let regexp1 = /^1\d{10}$/;
    if (phone && regexp1.test(phone)) {
		$("#wzck_kbbk_phone2").val(phone);
	}
	let subject = $(this).attr("data-subject");
	if (subject) {
		$(".sqbb_box_a").removeClass("qrxx_nav_boxac");
		$(".sqbb_box_a[data-subject=" + subject + "]").addClass("qrxx_nav_boxac");
	}
});

// 关闭开通服务
$(".wzck_kbbk_sskt_cuo").click(function () {
	$(".wzck_kbbk_ktbg").css("display", "none");
	orderNoStatusNum = 0;
});
// 关闭推荐服务
$(".wzck_kbbk_dytg_cuo").click(function () {
	$(".dytg_showModal_bg").css("display", "none");
});

// 客户开通记录
var swiper1 = new Vue({
	el: "#swiper2",
	data: {
		list: swiper1_list,
	},
});
// 客户开通记录
var swiper1 = new Vue({
	el: "#swiper1",
	data: {
		list: swiper1_list,
	},
});
// 案例
var wzck_tmdzy = new Vue({
	el: "#wzck_tmdzy",
	data: {
		list: wzckApp_tmdzy_anli_list,
	},
});
// 案例
var wzck_tmdzy1 = new Vue({
	el: "#wzck_tmdzy1",
	data: {
		list: wzckApp_tmdzy_anli_list1,
	},
});

// 选择申请主体
var subject = "个体户";
$(".sqbb_box_a").click(function () {
	subject = $(this).attr("data-subject");
	$(".sqbb_box_a").removeClass("qrxx_nav_boxac");
	$(".sqbb_box_a[data-subject=" + subject + "]").addClass("qrxx_nav_boxac");
});

// 开通服务
$(".sqbb_box_b").click(function () {
	let index = $(this).attr("data-index");
	zxktfw_b(index);
});
// console.log(wzck_kbbk_ktfw_list)
// 选择套餐
function zxktfw_b(index) {
	$(".sqbb_box_b").removeClass("qrxx2_nav_boxac");
	$(".sqbb_box_b[data-index=" + index + "]").addClass("qrxx2_nav_boxac");
	wzck_kbbk_ktfw_id = wzck_kbbk_ktfw_list[index].id;
	$(".ktbg_box_right_qrxx_money").html(wzck_kbbk_ktfw_list[index].price);
	$(".ktbg_box_right_qrxx_moneyOld").html("¥" + wzck_kbbk_ktfw_list[index].oldprice);
}

// 勾选服务协议
$("#wzck_kbbk_checkbox").click(function () {
	if ($("#wzck_kbbk_checkbox").attr("data-i") == "1") {
		$("#wzck_kbbk_checkbox").attr("data-i", "0");
	} else {
		$("#wzck_kbbk_checkbox").attr("data-i", "1");
	}
});

// 立即开通下单
$("#wzck_kbbk_ljsq2").click(function () {
	if ($("#wzck_kbbk_checkbox").attr("data-i") == "0") {
		alert("请先阅读服务协议");
		return;
	}

	var phone = $("#wzck_kbbk_phone2").val();

	if (!phone) {
		alert("请输入手机号!");
		return;
	}

	var regexp1 = /^1\d{10}$/;
	if (!regexp1.test(phone)) {
		alert("请输入正确的手机号！");
		return;
	}

	$("#alipay").css("display", "none");
	$("#wxpay").css("display", "none");

	payFrom();
});

function payFrom() {
	var phone = $("#wzck_kbbk_phone2").val();
	$.ajax({
		type: "post",
		async: false,
		data: {
			productId: wzck_kbbk_ktfw_id,
			applyName: "",
			applyMobile: phone,
			host: location.host,
			source: source,
			subject: subject,
			keyword: localStorage.getItem("q"),
			platform: localStorage.getItem("platform"),
			pageUrl: localStorage.getItem("bdoCPX"),
		},
		url: wzck_host + "/open/api/wzck/douyin_order/submit",
		success: function (res) {
			if (res.code == 0) {
				localStorage.setItem("TgDytgData", JSON.stringify(res.data));
				$("#wzck_kbbk_qrxx").css("display", "none");
				$("#wzck_kbbk_sskt").css("display", "block");
				$("#wzck_kbbk_ktcg").css("display", "none");

				if (res.data.payType == "wxpay" || res.data.payType == "weixin") {
					$("#wxpay").css("display", "block");
				}

				if (res.data.payType == "alipay") {
					$("#alipay").css("display", "block");
				}

				$(".wzck_kbbk_money").html(res.data.money);
				$(".ktbg_box_right_sskt_code img").attr("src", res.data.qrcode);
				orderNoStatusNum = 60;
				$(".ktbg_box_right_sskt_code_bg").css("display", "none");
				orderNoStatus();
			} else if (res.code == 10002) {
				alert("您已是会员！");
				$(".wzck_kbbk_ktbg").css("display", "none");
				$("#wzck_kbbk_qrxx").css("display", "none");
				$("#wzck_kbbk_sskt").css("display", "none");
				$("#wzck_kbbk_ktcg").css("display", "none");
				// $('.dlbg').css('display', 'flex');
			} else {
				alert(res.msg);
			}
		},
	});
}

//查询订单状态
var serviceCode = "";
var wzck_kbbk_ktcg_num = 4; //3秒后跳转系统
function orderNoStatus() {
	orderNoStatusNum--;
	if (orderNoStatusNum < 1) {
		$(".ktbg_box_right_sskt_code_bg").css("display", "flex");
		return;
	}
	var orderData = JSON.parse(localStorage.getItem("TgDytgData"));
	setTimeout(function () {
		$.ajax({
			url: wzck_host + "/open/api/wzck/douyin_order/get_order_status",
			type: "post",
			data: {
				orderNo: orderData.orderNo,
			},
			success: function (r) {
				if (r.code == 0) {
					if (r.data.status == "paid") {
						serviceCode = r.data.serviceCode;
						$("#wzck_kbbk_sskt").css("display", "none");
						$("#wzck_kbbk_ktcg").css("display", "block");
						wzck_kbbk_ktcg_num = 4;
						//3秒后跳转系统
						gotoXt();
					} else {
						orderNoStatus();
					}
				} else {
					orderNoStatus();
				}
			},
		});
	}, 3000);
}

//我已付款
$(".ktbg_box_right_sskt_code_btn1").click(function () {
	var orderData = JSON.parse(localStorage.getItem("TgDytgData"));
	$.ajax({
		url: wzck_host + "/open/api/wzck/douyin_order/get_order_status",
		type: "post",
		data: {
			orderNo: orderData.orderNo,
		},
		success: function (r) {
			if (r.code == 0) {
				if (r.data.status == "paid") {
					serviceCode = r.data.serviceCode;
					$("#wzck_kbbk_sskt").css("display", "none");
					$("#wzck_kbbk_ktcg").css("display", "block");
					wzck_kbbk_ktcg_num = 4;
					//3秒后跳转系统
					gotoXt();
				} else {
					alert("该订单未支付，如已支付请联系客服！");
				}
			} else {
				alert("查询订单状态失败");
			}
		},
	});
});

//重新扫码
$(".ktbg_box_right_sskt_code_btn2").click(function () {
	$(".ktbg_box_right_sskt_code_bg").css("display", "none");
	orderNoStatusNum = 60;
	orderNoStatus();
});

//跳转系统
function gotoXt() {
	wzck_kbbk_ktcg_num = wzck_kbbk_ktcg_num - 1;
	$("#wzck_kbbk_ktcg_num").text(wzck_kbbk_ktcg_num);
	if (wzck_kbbk_ktcg_num <= 1) {
		location.href = "http://www.wfwzs.com/dylvjfy/index.html?serviceCode=" + serviceCode;
		return;
	}
	setTimeout(function () {
		gotoXt();
	}, 1000);
}
