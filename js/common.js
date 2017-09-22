var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 2. Создается объект player. This function creates an <iframe> (and YouTube player)
// где videoId - это идентификатор видео. 
// В любом месте можно изменить значение видео с помощью player.loadVideoById('новый_идентификатор_видео');
// Параметры плеера, такие как показать/скрыть controls, showinfo можно править в массиве playerVars

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '490',
      width: '100%',
      videoId: '974CsH5Cumg',
      playerVars: { 
        'autoplay': 0,
        'controls': 1, 
        'showinfo': 1
      },
      events: {
        'onReady': onPlayerReady
      }
    });
}


// 3. API вызовит эту функцию когда видео плеер будет загружен
function onPlayerReady(event) {
    //event.target.playVideo();
}

//функция, которая останавливает проигрывание      
  
function stopVideo() {
    player.stopVideo();
}

//Эта простая функция парсит URL ссылки видео с youtube и возвращает идентификатор видео.
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('.toTop').fadeIn();
        } else {
            $('.toTop').fadeOut();
        }
    });
    $('.toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

var nav = $('.header-topped');
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        nav.addClass("header-topped_fided");
    } else {
        nav.removeClass("header-topped_fided");
    }
});

jQuery(document.body).on('click', '.video-play', function(e) {
   // e.preventDefault();
    var videoId = $(this).find('.video-bag').html();
    videoId = youtube_parser(videoId);
    player.loadVideoById(videoId);
});



$(document).ready(function(){
	ymaps.ready(init);

	function init() {
	    var center = [54.977971,73.391451];
	    var myMap = new ymaps.Map('mape', {
	        center: center,
	        controls: [],
	        zoom: 14,  
	        controls: ['smallMapDefaultSet']
	    }, {
	        searchControlProvider: 'yandex#search'
	 
	    });
	    
	    myMap.behaviors.disable('scrollZoom');
	 
	    var myPlacemark = new ymaps.Placemark(center, {
	        // Свойства.
	        // Содержимое иконки, балуна и хинта.
	    	// balloonContent: 'улица Ивана Франко, 4к4',
	     //    hintContent: 'улица Ивана Франко, 4к4'
	    }, {
	        // Опции.
	        iconLayout: 'default#image',
            iconImageHref: 'img/balun.png',
            iconImageSize: [40, 64]
	        // preset: 'twirl#violetIcon'
	    });
	   
	    myMap.geoObjects.add(myPlacemark);
	}

    

    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
    });
    $('.main-menu a[href^="#"]').click(function(e){ 
        e.preventDefault();
        var $element = $('a[name=' + $(this).attr('href').substr(1) + ']');
        if($element.length == 1) { 
            $('html, body').animate({ scrollTop: $element.offset().top }, 500); 
        }     
    });

    $("[data-fancybox]").fancybox({
        // Options will go here
    });
    
	$('a[data-modal="modal"]').on("click", function(e){
		e.preventDefault();
		var  id = $(this).attr('href'),
		winW = $(window).width(),
		winH = $(window).height();
		$(id).css("left", winW/2-$(id).innerWidth()/2);
		$(id).css("top", winH/2-$(id).innerHeight()/2);
		$('body').append('<div class="mask"></div>');
		$(id).fadeIn();
	});
    $('a[data-modal="modal-video"]').on("click", function(e){
        e.preventDefault();
        var  id = $(this).attr('href'),
        winW = $(window).width(),
        winH = $(window).height();
        $(id).css("left", winW/2-$(id).innerWidth()/2);
        $(id).css("top", winH/2-$(id).innerHeight()/2);
        $('body').append('<div class="mask"></div>');
        $(id).fadeIn();
    });
	 
	$('body').on("click", ".modal-close", function(e){
		e.preventDefault();
		$('.mask').remove();
		$('.modal-window').hide();
        $('.modal-window-video').hide();
        player.stopVideo();
	});
	$('body').on("click", ".mask", function(e){
		e.preventDefault();
		$('.mask').remove();
		$('.modal-window').hide();
        $('.modal-window-video').hide();
	});

	function cleanTnanks(){
		$('.mask').remove();
		$('.modal-window').hide();
		$('input[type=text]').removeClass('error-input');
	  	$("input[type=text]").val("");
	  	$("textarea").val("");
	  	$('a[href="#thanks"]').trigger('click');
	};
    $(".form-callback").submit(function() { 

        var tel = $(this).find('input[name="phone"]');
        var empty = false;
        if (tel.val() == ""){
            empty = true;
        }
        if (empty == true){
            tel.addClass("error-input");
            tel.focus();
        }else{
            var form_data = $(this).serialize(); 

            $.ajax({
                type: "POST", 
                url: "/sendmessage.php", 
                data: form_data,
                success: function() {
                    cleanTnanks();
                }
            });
        }
        return false;
    });
    $(".form-ask").submit(function() { 
        var tel = $(this).find('input[name="phone"]');
        var empty = false;
        if (tel.val() == ""){
            empty = true;
        }
        if (empty == true){
            tel.addClass("error-input");
            tel.focus();
        }else{
            var form_data = $(this).serialize(); 
            $.ajax({
                type: "POST", 
                url: "/sendmessage.php", 
                data: form_data,
                success: function() {
                    cleanTnanks();
                }
            });
        }
        return false;
    });
    $(".form-consult").submit(function() { 
        var tel = $(this).find('input[name="phone"]');
        var empty = false;
        if (tel.val() == ""){
            empty = true;
        }
        if (empty == true){
            tel.addClass("error-input");
            tel.focus();
        }else{
            var form_data = $(this).serialize(); 
            $.ajax({
                type: "POST", 
                url: "/sendmessage.php", 
                data: form_data,
                success: function() {
                    cleanTnanks();
                }
            });
        }
        return false;
    });

    $(".any-form").submit(function() { 
        var tel = $(this).find('input[name="phone"]');
        var empty = false;
        if (tel.val() == ""){
            empty = true;
        }
        if (empty == true){
            tel.addClass("error-input");
            tel.focus();
        }else{
            var form_data = $(this).serialize(); 
            $.ajax({
                type: "POST", 
                url: "/sendmessage.php", 
                data: form_data,
                success: function() {
                    cleanTnanks();
                }
            });
        }
        return false;
    });


    var tesimonials_slider = $(".tesimonials-slider");
    tesimonials_slider.owlCarousel({
        loop:true,
        nav:true, 
        autoplay:false,
        smartSpeed:1000,
        margin:0,
        mouseDrag:true,
        touchDrag: true,
        
        navText:['<span class="arr-left"></span>','<span class="arr-right"></span>'],
        responsive:{
            0:{
                items:1
            },      
            990:{
                items:1
            },  
            1248:{
                items:1
            }
        }
    });

    var team_slider = $(".team-slider");
    team_slider.owlCarousel({
        loop:true,
        nav:true, 
        autoplay:false,
        smartSpeed:1000,
        margin:0,
        mouseDrag:true,
        touchDrag: true,
        
        navText:['<span class="arr-left button"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>','<span class="arr-right button"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>'],
        responsive:{
            0:{
                items:1
            },      
            990:{
                items:1
            },  
            1248:{
                items:1
            }
        }
    });
    var faq_slider = $(".faq-slider");
    faq_slider.owlCarousel({
        loop:true,
        nav:true, 
        autoplay:false,
        smartSpeed:1000,
        margin:0,
        mouseDrag:true,
        touchDrag: true,
        
        navText:['<span class="arr-left button"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>','<span class="arr-right button"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>'],
        responsive:{
            0:{
                items:1
            },      
            990:{
                items:1
            },  
            1248:{
                items:1
            }
        }
    });

	$('.phone').mask("+7(999)999-99-99?");
});
