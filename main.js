var t = new Date();
var checkdate = false;
jQuery(document).ready(function($){

	var timelineBlocks = $('.cd-timeline-block'),
			offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
		? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
		: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});
jQuery(document).ready(function(){
	$("#owl-demo").owlCarousel({
		items : 5,
		lazyLoad : true,
		pagination : false,
		navigation : true,
		autoPlay: 3000,
		stopOnHover: true,
		itemsDesktop: [1199, 5],
		itemsDesktopSmall: [979, 4],
		itemsTablet: [768,2],
		itemsTabletSmall: [480, 2],
		itemsMobile: [360, 2],
		navigationText : ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"]
	});

	$("#owl-slider").owlCarousel({
		navigation : true, // Show next and prev buttons
		paginationSpeed : 400,
		pagination : true,
		singleItem:true,
		stopOnHover: true,
		transitionStyle : "fade",
		autoPlay: 5000,
		navigationText : ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"]
	});
});
function get_list_ajax(array, container, view, cb) {
	$.each(array,function(i,url){
		$.ajax({
			url:'/products/'+url+'?view='+view,
			async: false,
			success:function(data){       
				$(container).append(data);
				cb && (i+1) === array.length ? cb(i) : null ;
			}
		});
	});
}
function show_store (iframe){
	$('.list_address').html(iframe);
}
function compare(){
	jQuery('.modal-body.equal .row').html('');
	jQuery('.compare').each(function(){
		if(jQuery(this).prop('checked'))
		{
			node = jQuery('.product-item.'+jQuery(this).attr('data')).html();
			jQuery('.modal-body.equal .row').append("<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>"+node+"</div>");
		}
	});
}
function deletecart(variant_id){
	Haravan.removeItem(variant_id,function(){
		getCartAjax();
	})
}
var slug = function(str) {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "");
	str = str.replace(/đ|₫/g, "");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "");
	str = str.replace(/-+-/g, ""); //thay thế 2- thành 1- 
	str = str.replace(/^\-+|\-+$/g, "");
	return str;
}
/* Lấy danh sách thời gian đặt hàng */
function getDate(){
	"use strict";
	var fulldate = getcurrenttime(t);
	setcurrenttime(t);
	jQuery('#data_order').val(fulldate).datepicker({
		changeMonth: true,
		numberOfMonths: 1,
		dateFormat: "dd/mm/yy",
		minDate: t,
		onSelect: function(selectedDate) {
			var seldate = $(this).datepicker('getDate');
			seldate = seldate.toDateString();
			seldate = seldate.split(' ');
			var weekday = seldate[0];
			if(fulldate == selectedDate){
				setcurrenttime(t);
			}else{
				checkdate = false;
				$('#modal-checkout-button').removeAttr('disabled');
				$('.note_timeout').hide();
				var hours, minutes,html = '';
				html += '<option selected value="Càng sớm càng tốt">Càng sớm càng tốt</option>';
				if(weekday == 'Sun'){
					for (var i = 600; i<= 1020; i+= 30){
						hours = Math.floor(i / 60);
						minutes = i % 60;
						if(minutes < 10){
							minutes = "0" + minutes;
						}
						if(hours < 10){
							hours = "0" + hours;
						}
						html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
					}
				}
				else{
					for (var i = 600; i<= 1260; i+= 30){
						hours = Math.floor(i / 60);
						minutes = i % 60;

						if(minutes < 10){
							minutes = "0" + minutes;
						}
						if(hours < 10){
							hours = "0" + hours;
						}
						html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
					}
				}
				jQuery('#time_order').html(html);
			}
		}
	});
}
/* Lấy thời gian hiện tại */
function getcurrenttime(today){

	"use strict";
	var string_date = '';
	var day = today.getDate();
	var fullyear = today.getFullYear();
	var month = today.getMonth() + 1;

	month < 10 ? month = "0" + month : month;
	day < 10 ? day = "0" + day : day;
	var string_date = day + "/" + month + "/" + fullyear;
	return string_date;
}
/* Thiết lập đặt hàng với thời gian hiện tại */
function setcurrenttime(today){
	"use strict";
	var hours_today = today.getHours();
	var minus_today = today.getMinutes();
	var weekday = today.getDay();
	console.log(weekday);
	var hours, minutes,html='',check_condition = '';
	if(weekday == 0){
		if((hours_today == 17) || hours_today > 17){
			checkdate = true;
			$('.note_timeout').html('Bạn vui lòng chọn thời gian nhận hàng vào ngày hôm sau');
			$('.note_timeout').show();
			$('#modal-checkout-button').attr('disabled','disabled');
			html += '<option selected value="Càng sớm càng tốt">Càng sớm càng tốt</option>';
			for (var i = 600; i<= 1260; i+= 30){
				hours = Math.floor(i / 60);
				minutes = i % 60;
				if(minutes < 10){
					minutes = "0" + minutes;
				}
				if(hours < 10){
					hours = "0" + hours;
				}
				html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
			}
		}
		else{
			checkdate = false;
			var j = 0;
			if(hours_today < 8){
				j = 600;
			}else if(minus_today <= 30){
				j = (hours_today + 2) * 60 + 30;
			}else if(minus_today > 30 && minus_today < 59){
				j = ((hours_today + 2) * 60) + 60;
			}else if(hours_today == '21'){
				j = hours_today;
			}
			$('.note_timeout').html('');
			html += '<option selected value="Càng sớm càng tốt">Càng sớm càng tốt</option>';
			for (j; j<= 1260; j+= 30){
				hours = Math.floor(j / 60);
				minutes = j % 60;

				if(minutes < 10){
					minutes = "0" + minutes;
				}
				if(hours < 10){
					hours = "0" + hours;
				}
				html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
			}
		}
	}
	else{
		if((hours_today == 19 && minus_today > 30) || hours_today > 19){
			checkdate = true;
			$('.note_timeout').html('Bạn vui lòng chọn thời gian nhận hàng vào ngày hôm sau');
			$('#modal-checkout-button').attr('disabled','disabled');
			html += '<option selected value="Càng sớm càng tốt">Càng sớm càng tốt</option>';
			for (var i = 600; i<= 1260; i+= 30){
				hours = Math.floor(i / 60);
				minutes = i % 60;
				if(minutes < 10){
					minutes = "0" + minutes;
				}
				if(hours < 10){
					hours = "0" + hours;
				}
				html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
			}
		}
		else{
			checkdate = false;
			var j = 0;
			if(hours_today < 8){
				j = 600;
			}else if(minus_today <= 30){
				j = (hours_today + 2) * 60 + 30;
			}else if(minus_today > 30 && minus_today < 59){
				j = ((hours_today + 2) * 60) + 60;
			}else if(hours_today == '21'){
				j = hours_today;
			}
			$('.note_timeout').html('');
			html += '<option selected value="Càng sớm càng tốt">Càng sớm càng tốt</option>';
			for (j; j<= 1260; j+= 30){
				hours = Math.floor(j / 60);
				minutes = j % 60;

				if(minutes < 10){
					minutes = "0" + minutes;
				}
				if(hours < 10){
					hours = "0" + hours;
				}
				html += '<option value=' + hours + ':' + minutes + '>'+ hours + ':' + minutes +'</option>';
			}
		}
	}
	jQuery('#time_order').html(html);
}
function checkphone(phone) {
	var re = /(^0[2-9]\d{8}$)|(^01\d{9}$)/;
	return re.test(phone);
}
function checkFileName(jobFileCV){
	var extension = jobFileCV.substr((jobFileCV.lastIndexOf('.') +1));
	switch(extension) {
		case 'zip':
		case 'rar':
		case 'pdf':
		case 'doc':
		case 'docx':
		case 'xlsx':
			return true;
			break;
		default:
			return false;
	}
}
function initJob(){
	var that = this;
	$('.job_header').click(function() {
		var job_parent = $(this).parents('.job_item');
		if (job_parent.hasClass('active')) {
			job_parent.removeClass('active');
			//job_parent.find('.job_content').slideUp();
		} else {
			$('.job_item').removeClass('active');
			$('.job_content').slideUp();
			job_parent.addClass('active');
			//job_parent.find('.job_content').slideDown();
		}
	});
	$('.frame-link').click(function() {
		$('#cv_form').modal('show');
		$('.job_form_cv').find('.job_name').val($(this).data('title'));
		$('.job_form_cv').find('.job_fullname').val('');
		$('.job_form_cv').find('.job_phone').val('');
		$('.job_form_cv').find('.job_body').val('');
		$('.job_form_cv').find('.upfile').val('');
		$('.job_form_cv').find('.error').hide();
		$('.job_form_cv').find('.fa-exclamation-triangle').hide();
	});
	$(document).on('click','.submit_form_cv',function(){
		var thatFormCV = $(this);
		var jobName = $(this).parents('.job_form_cv').find('.job_name').val();
		var jobFullName = $(this).parents('.job_form_cv').find('.job_fullname').val();
		var jobPhone = $(this).parents('.job_form_cv').find('.job_phone').val();
		var jobContent = $(this).parents('.job_form_cv').find('.job_body').val();
		var jobFileCV = $(this).parents('.job_form_cv').find('.upfile').val();
		var jobFileElement = $(this).parents('.job_form_cv').find('.upfile');
		var jobCV = '';
		if(jobFullName != '' && jobPhone != '' && jobContent != ''){
			debugger;
			if(checkphone(jobPhone) == false){
				$(this).parents('.job_form_cv').find('.reqPhone').hide();
				$(this).parents('.job_form_cv').find('.regexPhone').show();
			}else{
				$(this).parents('.job_form_cv').find('.reqPhone').hide();
				$(this).parents('.job_form_cv').find('.regexPhone').hide();

				if(jobFileCV != ''){
					if(jobFileCV.indexOf(' ') >=0){
						$('.error').html('Tên file không được đặt tên có khoảng trắng').show();
					}
					else if(checkFileName(jobFileCV) == false){
						$('.error').html('Định dạng file không đúng').show();
					}else if(jobFileElement[0].files[0].size > 1048576){
						$('.error').html('Kích thước file lớn hơn 1MB').show();
					}
					else{
						$('.error').hide();
						$(this).parents('.job_form_cv').find('.cv_upload').ajaxSubmit({
							async: false,
							success: function(){
								$('#cv_form').modal('hide');
								$.ajax({
									url: '/cart.js',
									dataType: 'json',
									async: false,
									success: function(cart) {}
								}).done(function(cart){
									$.each(cart.items,function(i,v){
										debugger;
										if(v.properties.hasOwnProperty('file')){
											jobCV = v.properties.file;
										}
									});
									$('#successForm').modal('show');
								});
							}
						});
						var obj = {};
						obj['entry.2093428500'] = jobName;
						obj['entry.1441437307'] = jobFullName;
						obj['entry.1091599571'] = jobPhone;
						obj['entry.913141500'] = jobContent;
						obj['entry.779784276'] = jobCV;

						$.ajax({
							type: 'POST',
							url: '//docs.google.com/forms/u/0/d/e/1FAIpQLSeFdNlFGwhxWnsDwjqssApo5Nuk_dr2MYz1osAh2wtdM4gZzQ/formResponse',
							data: obj,
							dataType: 'xml',
							async: false,
							success: function(cart) {},
							error: function(xhr, textStatus, errorThrown) {
							}
						});
						$.ajax({
							type: 'POST',
							url: '/cart/change.js',
							data:  'quantity=0&id=1052169246',
							async: false,
							success: function(cart) {},
							error: function(xhr, textStatus, errorThrown) {}
						});
					}
				}else{
					$('.error').html('Chưa upload CV').show();
				}
			}
		}else{
			if(jobFullName == '' || jobFullName == undefined || jobFullName == 'undefined' ){
				$(this).parents('.job_form_cv').find('.job_fullname').next().show();
			}
			if(jobPhone == '' || jobPhone == undefined || jobPhone == 'undefined' ){
				$(this).parents('.job_form_cv').find('.reqPhone').show();
				$(this).parents('.job_form_cv').find('.regexPhone').hide();
			}
			if(jobContent == '' || jobContent == undefined || jobContent == 'undefined' ){
				$(this).parents('.job_form_cv').find('.job_body').next().show();
			}
		}
	});
	$(document).on('change','.check_change',function(){
		var val = $(this).val();
		if(val != '' || val != undefined || val != 'undefined'){
			$(this).next().hide();
		}
	});
}

jQuery(document).ready(function(){
	jQuery('button.equa').click(function(){
		jQuery('.modal-body.equal .row').html('');
		jQuery('.compare').each(function(){
			if(jQuery(this).prop('checked'))
			{
				node = jQuery('.product-item.'+jQuery(this).attr('data')).html();
				jQuery('.modal-body.equal .row').append("<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>"+node+"</div>");
			}
		});
		if(jQuery('.modal-body.equal .row').html() == '')
			jQuery('.modal-body.equal .row').html('<div class="text-center">Bạn chưa chọn sản phẩm nào!</div>');
	})
	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
				c = isNaN(c = Math.abs(c)) ? 2 : c, 
				d = d == undefined ? "." : d, 
				t = t == undefined ? "," : t, 
				s = n < 0 ? "-" : "", 
				i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
				j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
	Haravan.onItemAdded = function(line_item) {
		console.log(line_item);
		jQuery('#cart-modal').modal();
		var html="<div class='content'><div class='col-sm-5 col-xs-12'><div class='cart1'><a href='"+line_item.url+"'><img src='"+line_item.image+"'/> </a></div><div class='cartItem'> <div><a href='"+line_item.url+"'>"+line_item.title+"</a></div><div><span class='item-price'></span></div> <div>Số lượng: "+line_item.quantity+"</div></div></div><div class='col-sm-7 col-xs-12'><div class='cartsum'> <div class='subTotal'>Gía trị đơn hàng:<em class='productPrice'></em> </div> <div>Giỏ hàng của bạn hiện có <span class='cart-count'></span> sản phẩm</div> </div></div></div></div>";

		jQuery('#cart-modal').find('.CartThumb').empty();
		jQuery('#cart-modal').find('.CartThumb').html(html);
		jQuery.getJSON('/cart.js', function(cart, textStatus) {
			jQuery('.cart-count').html(cart.item_count);
			jQuery('.productPrice').html((parseInt(cart.total_price)/100).formatMoney(0, '.', ',') + 'đ');
		});
		jQuery('.item-price').html((parseInt(line_item.price)/100).formatMoney(0, '.', ',') + 'đ');
		jQuery('.count-item').html();
	};
	Haravan.addItemFromForm = function(form_id, callback) {
		var params = {
			async: true,
			type: 'POST',
			url: '/cart/add.js',
			data: jQuery('#' + form_id).serialize(),
			dataType: 'json',
			success: function(line_item) {
				if ((typeof callback) === 'function') {
					callback(line_item);

				} else {
					Haravan.onItemAdded(line_item);
				}
			},
			//error: function(XMLHttpRequest, textStatus) {
			//Haravan.onError(XMLHttpRequest, textStatus);
			//}
		};
		jQuery.ajax(params);
	};

	$('.search-mb').click(function(){
		$('.block_search_mb').slideToggle();
	});
	$('.search-input-label').click(function(){
	$('.block_search_mb').slideUp();
})
	getDate();
	$('#cart-target a').click(function(event){
		event.preventDefault() ;
		getCartAjax();

		$('#myCart').modal('show');
		$('.modal-backdrop').css({'height':$(document).height()});
	});
	$('a[data-spy=scroll]').click(function(){
		event.preventDefault() ;
		$('body').animate({scrollTop: ($($(this).attr('href')).offset().top - 20) + 'px'}, 500);
	})
	$('#update-cart-modal').click(function(event){
		event.preventDefault();
		if (jQuery('#cartform').serialize().length <= 5) return;
		$(this).html('Đang cập nhật');
		var params = {
			type: 'POST',
			url: '/cart/update.js',
			data: jQuery('#cartform').serialize(),
			dataType: 'json',
			success: function(cart) {
				if ((typeof callback) === 'function') {
					callback(cart);
				} else {

					getCartAjax();
				}

				$('#update-cart-modal').html('Cập nhật');
			},
			error: function(XMLHttpRequest, textStatus) {
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	});
	$('#note').val('');
	$(document).on('click','#modal-checkout-button',function(e){
		e.preventDefault();
		var order_day = $('#data_order').val();
		var order_time = $('#time_order').val();
		console.log(checkdate);
		if(checkdate == true){
			$('#modal-checkout-button').attr('disabled','disabled');
		}
		else{
			var min_price = slug(String($('.item-total').html()));
			if(min_price <= 200000){
				$('#warning_order').modal('show');
			}else{
				var note_customer = $('#note').val();
				var noteTemp = note_customer + ". Đơn hàng sẽ giao hàng vào ngày " + order_day + " lúc " + order_time;
				$('#note').val(noteTemp);
				Haravan.updateCartNote(noteTemp,function(){
					window.location = '/checkout';
				});
			}
		}
	});
	initJob();
})

