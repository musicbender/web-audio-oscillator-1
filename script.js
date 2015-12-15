$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator;
    
    
    $('.play').on('click', function(){
       
        var trig = $('.trigger');

        trig.toggleClass('stop');
        trig.toggleClass('play');
        
        if (trig.hasClass('stop')){
            oscillator = context.createOscillator(); // Create sound source
            oscillator.connect(context.destination); // Connect sound to output
            oscillator.type = 'triangle';
            oscillator.start();
        }
        else {
            oscillator.stop();
        }
    });
    
    /*
    $('.stop').on('click', function(){
        console.log('stopped');
        //oscillator.stop();
        $('.trigger').removeClass('stop');
        $('.trigger').addClass('play');
    });*/
    
    
});