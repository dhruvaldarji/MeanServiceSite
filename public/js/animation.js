$(function(){
//
//    // Only animate elements when using non-mobile devices
//    if (jQuery.browser.mobile === false){
//
//        /*-------------------------------------------------------------------*/
//        /*  1. Section subtitle
//        /*-------------------------------------------------------------------*/
//        $('.section-subtitle').css('opacity', 0).one('inview', function(isInView){
//            if (isInView) {$(this).addClass('animated bounceInLeft').css('opacity', 1);}
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  2. Section - Profile
//        /*-------------------------------------------------------------------*/
//        $('.profile-text', '#profile').find('p:not(:first)').css('opacity', 0).one('inview', function(isInView){
//            if (isInView) {$(this).addClass('animated bounceInUp').css('opacity', 1);}
//        });
//
//        /*-------------------------------------------------------------------*/
//        /*  3. Section - Strengths
//        /*-------------------------------------------------------------------*/
//        $('.legend-left', '#strengths').find('.legend-title').css('opacity', 0).one('inview', function(isInView){
//            if (isInView) {$(this).addClass('animated bounceInLeft').css('opacity', 1);}
//        });
//
//        $('.legend-right', '#strengths').find('.item').each(function(i){
//            var element = $(this),
//            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
//            element.css('opacity', 0).one('inview', function(isInView) {
//                if (isInView){
//                    setTimeout(function(){
//                        element.addClass('animated bounceInUp').css('opacity', 1);
//                    } , itemsDelay * (i * 3));
//                }
//            });
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  4. Section - Services
//        /*-------------------------------------------------------------------*/
//        $('#service').find('.service-item:not(:first)').each(function(i){
//            var element = $(this),
//            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
//            element.css('opacity', 0).one('inview', function(isInView) {
//                if (isInView){
//                    setTimeout(function(){
//                        element.addClass('animated bounceInUp').css('opacity', 1);
//                    } , itemsDelay * (i * 2));
//                }
//            });
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  5. Section - Accolades
//        /*-------------------------------------------------------------------*/
//        $('.accolades').find('.item:not(:first)').each(function(i){
//            var element = $(this),
//            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
//            element.css('opacity', 0).one('inview', function(isInView) {
//                if (isInView){
//                    setTimeout(function(){
//                        element.addClass('animated bounceInUp').css('opacity', 1);
//                    } , itemsDelay * (i * 2));
//                }
//            });
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  6. Section - Work Process
//        /*-------------------------------------------------------------------*/
//        $('#work-process').find('.title').each(function(i){
//            var element = $(this),
//            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
//
//            element.css('opacity', 0).one('inview', function(isInView) {
//                if (isInView){
//                    setTimeout(function(){
//                        element.addClass('animated fadeInUp').css('opacity', 1);
//                    } , itemsDelay * (i * 5));
//                }
//            });
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  7. Section - Contact
//        /*-------------------------------------------------------------------*/
//        $('.contact-details', '#contact').css('opacity', 0).one('inview', function(isInView){
//            if (isInView) {$(this).addClass('animated flipInX').css('opacity', 1);}
//        });
//
//
//        /*-------------------------------------------------------------------*/
//        /*  8. Footer
//        /*-------------------------------------------------------------------*/
//        /*$('.footer').find('.item').each(function(i){
//            var element = $(this),
//            itemsDelay   = ( isNaN($(this).data('animation-delay')) ? 50 : $(this).data('animation-delay'));
//
//            element.css('opacity', 0).one('inview', function(isInView) {
//                if (isInView){
//                    setTimeout(function(){
//                        element.addClass('animated bounceIn').css('opacity', 1);
//                    } , itemsDelay * (i * 2));
//                }
//            });
//        });*/
//    }
});