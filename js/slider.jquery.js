// Allow users to press Forward and Back buttons on the screen to navigate through images
// Let users use their left and right arrow keys to navigate through the images
// Make the navigation button loop to the beginning when you reach the end of the slider
// Make the slideshow run automatically every 20 seconds
// Reset the slider time if the user clicks the Next or Back buttons so that it doesn't ever
// automatically scroll after the user clicks a button

(function($) {
    $.fn.imageSlider = function(options) {
        var defaults = {
            duration: 1000,
            animationDelay: 5000
        };


        var settings = $.extend({}, defaults, options);

        return this.each(function() {
            var $slider = $(this);
            var $sliderList = $slider.children("ul");
            var $sliderItems = $sliderList.children("li");
            var $allButtons = $slider.find(".button");
            var $buttons = {
                forward: $allButtons.filter(".forward"),
                back: $allButtons.filter(".back")
            };

            var totalImages = $sliderItems.length;
            var currentIndex = 1;
            var $index = $(".index");


            var imageWidth = $sliderItems.first().children("img").width();
            var endMargin = -(($sliderItems.length - 1) * imageWidth);

            var timer = setTimeout(automaticSlide, settings.animationDelay);

            function animateSlider(direction, callback) {
                $sliderList.stop(true, true).animate({
                    "margin-left" : direction + "=" + imageWidth
                }, settings.duration, function() {
                    var increment = (direction === "+" ? -1 : 1);
                    updateIndex(currentIndex + increment);

                    if (callback && typeof callback == "function") {
                        callback();
                    }
                });
            };

            function animateSliderToMargin(margin, callback) {
                $sliderList.stop(true, true).animate({
                    "margin-left" : margin
                }, settings.duration, callback);
            };

            function getLeftMargin() {
                return parseInt($sliderList.css("margin-left"), 10);
            };

            function isatBeginning() {
                return getLeftMargin() >= 0;
            };

            function isAtEnd() {
                return getLeftMargin() <= endMargin;
            };

            function updateIndex(newIndex) {
                currentIndex = newIndex;
                $index.text(currentIndex);
            };

            function triggerSlider(direction, callback) {
                var isBackButton = (direction === "+");

                if(!isBackButton && isAtEnd()){
                    animateSliderToMargin(0, callback);
                    updateIndex(1);
                } else if (isBackButton && isatBeginning()) {
                    animateSliderToMargin(endMargin, callback);
                    updateIndex(totalImages);
                } else {
                    animateSlider(direction, callback);
                }
            };

            function resetTimer() {
                if(timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(automaticSlide, 30000);
            };

            function automaticSlide() {
                timer = setTimeout(function() {
                    triggerSlider("-", function() {
                        automaticSlide();
                    });
                }, settings.animationDelay);;
            };

            $allButtons.on("click", function(event) {
                resetTimer();
                var isBackButton = $(this).hasClass("back");
                triggerSlider((isBackButton ? "+" : "-"));

                event.preventDefault();
            });

            $(document.documentElement).on("keyup", function(event) {
                if (event.keyCode === 37) {
                    resetTimer();
                    triggerSlider("+");
                } else if (event.keyCode === 39) {
                    resetTimer();
                    triggerSlider("-");
                }
            });
        });
    };
})(jQuery);
