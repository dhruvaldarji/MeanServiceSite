$(function () {
//
//    /*-------------------------------------------------------------------*/
//    /*  1. Preloader. Requires jQuery jpreloader plugin.
//     /*-------------------------------------------------------------------*/
//    $(document).ready(function () {
//        if ($.fn.jpreLoader) {
//            $('body').jpreLoader({
//                showPercentage: false,
//                loaderVPos: '50%'
//            });
//        }
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  2. Makes the height of all selected elements (".match-height")
//     /*  exactly equal. Requires jQuery matchHeight plugin.
//     /*-------------------------------------------------------------------*/
//    $(window).smartload(function () {
//        if ($.fn.matchHeight) {
//            $('.match-height').matchHeight();
//        }
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  3. Just did another hack of dropdown menu for Bootstrap scrollspy.
//     /*-------------------------------------------------------------------*/
//    $('body').on('activate.bs.scrollspy', function () {
//        $('.page-scroll.dropdown > .dropdown-toggle').each(function () {
//            $(this).attr('data-target', '#');
//        });
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  4. Page scrolling feature, requires jQuery Easing plugin.
//     /*-------------------------------------------------------------------*/
//    var pageScroll = function () {
//        $('.page-scroll > a').bind('click', function (e) {
//            e.preventDefault();
//
//            var anchor = $(this),
//                href = anchor.attr('href'),
//                offset = $('body').attr('data-offset');
//
//            $('html, body').stop().animate({
//                scrollTop: $(href).offset().top - (offset - 1)
//            }, 1500, 'easeInOutExpo');
//        });
//    };
//
//    pageScroll();
//
//
//    /*-------------------------------------------------------------------*/
//    /*  5. Make navigation menu on your page always stay visible.
//     /*  Requires jQuery Sticky plugin.
//     /*-------------------------------------------------------------------*/
//    var stickyMenu = function () {
//        var ww = Math.max($(window).width(), window.innerWidth),
//            nav = $('.navbar.navbar-fixed-top');
//
//        if ($.fn.unstick) {
//            nav.unstick();
//        }
//
//        if ($.fn.sticky && ww >= 992) {
//            nav.sticky({topSpacing: 0});
//        }
//    };
//
//    stickyMenu();
//
//    // Call stickyMenu() when window is resized.
//    $(window).smartresize(function () {
//        stickyMenu();
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  6. Navbar dropdown opening on hover,
//     /*  and opening on click for collapsed navbar.
//     /*-------------------------------------------------------------------*/
//    var toggleNavbarMethod = function () {
//        var ww = Math.max($(window).width(), window.innerWidth),
//            dropdown = $('.navbar .dropdown');
//
//        if (ww >= 992) {
//            dropdown.on('mouseover', function () {
//                if (!$(this).hasClass('open')) {
//                    $(this).addClass('open');
//                }
//            }).on('mouseout', function () {
//                if ($(this).hasClass('open')) {
//                    $(this).removeClass('open');
//                }
//            });
//        }
//        else {
//            dropdown.off('mouseover').off('mouseout');
//        }
//    };
//
//    toggleNavbarMethod();
//
//    // Call toggleNavbarMethod(); when window is resized.
//    $(window).smartresize(function () {
//        toggleNavbarMethod();
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  7. Prevent bootstrap dropdown closing when clicked.
//     /*-------------------------------------------------------------------*/
//    $('.dropdown-menu').click(function (e) {
//        e.stopPropagation();
//    });
//
//
//    /*-------------------------------------------------------------------*/
//    /*  8. Automatically retract the navigation
//     /*  when users click on a page for mobile.
//     /*-------------------------------------------------------------------*/
//    document.body.addEventListener('touchmove', function () {
//        if (!$(this).is('.navbar-toggle') || !$(this).is('.navbar-collapse') || !$(this).is('.dropdown-toggle') || !$(this).is('.page-scroll > a')) {
//            $('.berg-collapse').collapse('hide');
//        }
//    }, false);
//
//
//    $('.nav a').on('click', function () {
//        $('.btn-navbar').click(); //bootstrap 2.x
//        $('.navbar-toggle').click() //bootstrap 3.x by Richard
//    });
//
//    /*-------------------------------------------------------------------*/
//    /*  11. Section - My Resume
//     /*-------------------------------------------------------------------*/
//    var resumeCollapse = function () {
//        var ww = Math.max($(window).width(), window.innerWidth),
//            workItem = $('.collapse:not(:first)', '#work'),
//            educationItem = $('.collapse:not(:first)', '#education');
//
//        if (ww < 768) {
//            workItem.collapse('show');
//            educationItem.collapse('show');
//        }
//        else {
//            workItem.collapse('hide');
//            educationItem.collapse('hide');
//        }
//    };
//
//    // Call resumeCollapse() when window is loaded.
//    $(window).smartload(function () {
//        resumeCollapse();
//    });
//
//    // Call resumeCollapse() when window is resized.
//    $(window).smartresize(function () {
//        resumeCollapse();
//    });
//
//
//    ///*-------------------------------------------------------------------*/
//    ///*  16. Gravity Easter Egg!
//    // /*-------------------------------------------------------------------*/
//    //
//    //document.getElementById('gravity_element').onclick = function () {
//    //    var script = document.createElement("script");
//    //    script.src = "http://gravityscript.googlecode.com/svn/trunk/gravityscript.js";
//    //    document.body.appendChild(script);
//    //    void(0);
//    //};
//    //
//    ///*-------------------------------------------------------------------*/
//    ///*  17. Kickass Easter Egg!
//    // /*-------------------------------------------------------------------*/
//    //
//    //document.getElementById('kickass_element').onclick = function () {
//    //    var KICKASSVERSION = '2.0';
//    //    var s = document.createElement('script');
//    //    s.type = 'text/javascript';
//    //    document.body.appendChild(s);
//    //    s.src = '//hi.kickassapp.com/kickass.js';
//    //    void(0);
//    //};
//

});