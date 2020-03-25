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

    try {
        // Init
        $('#our-office-slider').slick({
            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            speed: 800,
        });
    } catch (error) {
        console.log(`SlickSlider plugin error: ${error}`);
    }

    try {
        //Vars
        let quiz = "#quiz";
        let $activeScreen = $(`${quiz} [data-screen="1"]`);
        let currentStep = $activeScreen.data('screen');
        let countStep = $(`${quiz} [data-screen]`).length - 1;

        addActive();

        //Handlers
        $(`${quiz} .next`).click(() => {         
            if(currentStep >= countStep) {
                return false;
            }

            removeActive();
            currentStep++;
            addActive();
        });
        $(`${quiz} .prev`).click(() => {             
            if(currentStep <= 1) {
                return false;
            }

            removeActive();
            currentStep--;
            addActive();
        });
        $(`${quiz}`).submit(function() {
            removeActive();
            addActive('thanks');
        });

        //Funcs
        function removeActive() {
            $activeScreen.removeClass('active');
        }
        function addActive(stepName) {
            if(stepName) {
                currentStep = stepName;
            }

            $activeScreen = $(`${quiz} [data-screen="${currentStep}"]`);
            $activeScreen.addClass('active');
            $activeScreen.find('.step').text(`Шаг ${currentStep} из ${countStep}`);
        }

    } catch (error) {
        console.log(`Quiz error: ${error}`);
    }

    $('label[for^="radio"]').click(function(e) { 
        e.preventDefault(); 
        $(this).prev().prop('checked', true);
    });

    //  Show ymaps on scroll
    let point = $('#about-company');
    let pointTop = point.offset().top;
    let handler = function () {
        let windowTop = $(this).scrollTop();
        if (windowTop > pointTop) {
            $('#map').html('<script async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A56da67ebdfb8d445d7b810dc9618955960e32b2090e1f8f457625284101ea561&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=false"></script>');
            $(window).unbind( "scroll", handler );
        }
    };
    $(window).bind( "scroll", handler ); 
});
