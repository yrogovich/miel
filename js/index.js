console.log('ok');
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
            },
            error: function () {
                console.log('form error');
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

    /*
    //Get scroll width
    function getScrollWidth() {
        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth;
    }
    */

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