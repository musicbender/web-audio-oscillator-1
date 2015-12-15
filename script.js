$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)(),
        oscillator,
        gain,
        trig = $('.trigger');
    
    $('.play').on('click', function(){
        soundToggle();
    });
    
    $(document).keypress(function(){
        soundToggle();
    });
    
    $('.slider').slider();
  
    
    function soundToggle () {
        trig.toggleClass('stop').toggleClass('play');
        
        if (trig.hasClass('stop')){
            soundOn();
        }
        else {
            soundOff();
        }
    }
    
    function soundOn () {
        oscillator = context.createOscillator(); // Create sound source
        //oscillator.connect(context.destination); // Connect sound to output
        oscillator.type = 'sine';

        gain = context.createGain();
        gain.gain.value = 1;
        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        trig.text('Stop');
    }
    
    function soundOff () {
        oscillator.stop();
        oscillator.disconnect();
        trig.text('Play');
    }
});