
var manobras = new (function() {
    var $stopwatch, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function() {
            $stopwatch.html(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            manobras.Timer = $.timer(updateTimer, incrementTime, false);
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
    $(init);
});
var qualidade = new (function() {
    var $stopwatchQualidade, // Stopwatch element on the page
        incrementTime = 70, // Timer speed in milliseconds
        currentTime = 0, // Current time in hundredths of a second
        updateTimer = function() {
            $stopwatchQualidade.html(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatchQualidade = $('#stopwatchQualidade');
            qualidade.Timer = $.timer(updateTimer, incrementTime, false);
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
    $(init);
});


/**
 * Example 2 is similar to example 1.  The biggest difference
 * besides counting up is the ability to reset the timer to a
 * specific time.  To do this, there is an input text field
 * in a form.
 */
var Example2 = new (function() {
    var $countdown,
        $form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = 10000,
        updateTimer = function() {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                Example2.Timer.stop();
                timerComplete();
                Example2.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
			document.on(prompt("Insira Observacoes sobre o exercicio","aqui"));
        },
        init = function() {
            $countdown = $('#countdown');
            Example2.Timer = $.timer(updateTimer, incrementTime, false);
            $form = $('#example2form');
            $form.bind('submit', function() {
                Example2.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function() {
        var newTime = parseInt($form.find('input[type=text]').val()) * 100;
        if (newTime > 0) {currentTime = newTime;}
        this.Timer.stop().once();
    };
    $(init);
});


var Example3 = new (function() {
    var $countdown3,
        $form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = 10000,
        updateTimer = function() {
            $countdown3.html(formatTime(currentTime));
            if (currentTime == 0) {
                Example3.Timer.stop();
                timerComplete();
                Example3.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
			document.on(prompt("Insira Observacoes sobre o exercicio","aqui"));
        },
        init = function() {
            $countdown3 = $('#countdown3');
            Example3.Timer = $.timer(updateTimer, incrementTime, false);
            $form = $('#example3form');
            $form.bind('submit', function() {
                Example3.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function() {
        var newTime = parseInt($form.find('input[type=text]').val()) * 100;
        if (newTime > 0) {currentTime = newTime;}
        this.Timer.stop().once();
    };
    $(init);
});

var Example4 = new (function() {
    var $countdown4,
        $form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = 10000,
        updateTimer = function() {
            $countdown4.html(formatTime(currentTime));
            if (currentTime == 0) {
                Example4.Timer.stop();
                timerComplete();
                Example4.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
			document.on(prompt("Insira Observacoes sobre o exercicio","aqui"));
        },
        init = function() {
            $countdown4 = $('#countdown4');
            Example4.Timer = $.timer(updateTimer, incrementTime, false);
            $form = $('#example4form');
            $form.bind('submit', function() {
                Example4.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function() {
        var newTime = parseInt($form.find('input[type=text]').val()) * 100;
        if (newTime > 0) {currentTime = newTime;}
        this.Timer.stop().once();
    };
    $(init);
});



/**
 * Example 4 is as simple as it gets.  Just a timer object and
 * a counter that is displayed as it updates.
 */
var count = 0,
    timer = $.timer(function() {
        count++;
        $('#counter').html(count);
    });
timer.set({ time : 1000, autostart : true });


// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}