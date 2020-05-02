

jQuery(document).ready(function(){
	$("#owl-demo").owlCarousel({
		items : 5,
		lazyLoad : true,
		pagination : false,
		navigation : true,
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
	$(".thumb").owlCarousel({
		navigation : true, // Show next and prev buttons
		paginationSpeed : 400,
		pagination : false,
		stopOnHover: true,
		transitionStyle : "fade",
		items: 6,
		itemsDesktop : [1199, 4],
		itemsDesktopSmall : [979, 6],
		itemsTablet : [768, 6],
		itemsTabletSmall : false,
		itemsMobile : [579, 5],
		navigationText : ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"]
	});
});
