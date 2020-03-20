window.addEventListener('load', () => {
    const preload = document.querySelector('.preload');
    preload.classList.add('preload-finish');
});

$(function() {
    // Form handler
    $('form').submit(function(event) {
        event.preventDefault();

        console.log('form func is running');

        let msg = jQuery(this).serialize();
        let $url = `${window.location.protocol}//${window.location.host}`;

        jQuery.ajax({
            type: 'POST',
            url: `${$url}/send.php`,
            data: msg,
            success: function(data) {
                console.log('form ok');
                jQuery.fancybox.close();
                jQuery.fancybox.open({
                    src: '#thanks-modal', 
                    modal: true
                });
                setTimeout(() => { 
                    jQuery.fancybox.close();
                }, 2000);
            },
            error: function () {
                console.log('form error');
                jQuery.fancybox.close();
            }
        });
    });

    // Jquery LazyLoad init
    try {
        $('.lazy').Lazy();
        $(".lazy-blur").Lazy({
            threshold: 0,
            afterLoad: function(element) {
              element.addClass("no-blur");
            }
        });
    } catch (error) {
        console.log(`LazyLoad plugin error: ${error}`);
    }

    //AOS
    try {
        AOS.init({
            duration: 1000, 
        });
    } catch (error) {
        console.log(`AOS plugin error: ${error}`);
    }

    // Smooth Scroll
    try {
        SmoothScroll({ 
            animationTime: 900,
            stepSize: 85,
        });
    } catch (error) {
        console.log(`SmoothScroll plugin error: ${error}`);
    }

    try {
        let autoplaySpeed = 3000; //ms
        let isPause;
        let tick;
        let percentTime;
        let $slider = $('#slider');
        let $bar = $('.slider-progressBar .progress');

        // Events
        $slider.on({
            mousedown: resumeSlider,
            mouseup: pauseSlider,
            mouseleave: pauseSlider,
            init: () => {
                resetProgressbar();
                startProgressbar();
            },
            beforeChange: function(event, slick, currentSlide, nextSlide){
                resetProgressbar();           
            },
            afterChange: function(event, slick, currentSlide, nextSlide){
                startProgressbar();
            }
        })
        
        // Init
        $slider.slick({
            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            // fade: true,
            speed: 800,
        });
       
        // Functions
        function resumeSlider() {
            isPause = true;
        }
        function pauseSlider() {
            isPause = false;
        }
        
        function startProgressbar() {
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        }
        function interval() {
            if(isPause === true) {
                return;
            }

            percentTime += 1000 / (autoplaySpeed + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            
            if(percentTime >= 100) {
                $slider.slick('slickNext');
            }
        }
        
        function resetProgressbar() {
            $bar.css({
                width: 0 + '%' 
            });
            clearTimeout(tick);
        }
    } catch (error) {
        console.log(`SlickSlider plugin error: ${error}`);
    }

    /*
    //  Show ymaps on scroll
    let point = $('#discounts');
    let pointTop = point.offset().top;
    let handler = function () {
        let windowTop = $(this).scrollTop();
        if (windowTop > pointTop) {
            $('#map').html('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7ebdb72eaffd8f5252bee2db8223a3e5d51e60278d52b1cc7e6b2288974cfa42&amp;width=100%&amp;height=100%&amp;lang=ru_RU&amp;scroll=false"></script>');
            $(window).unbind( "scroll", handler );
        }
    };
    $(window).bind( "scroll", handler ); 
    */
});

/*
// Youtube
(function() {
	let youtube = document.querySelectorAll( ".youtube" );	
	for (let i = 0; i < youtube.length; i++) {		
		let source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";		
		let image = new Image();
        image.src = source;
        image.addEventListener( "load", function() {
            youtube[ i ].appendChild( image );
        }( i ) );		
        youtube[i].addEventListener( "click", function() {
            let iframe = document.createElement( "iframe" );
                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
                    this.innerHTML = "";
                    this.appendChild( iframe );
        } );	
	};	
})();
*/