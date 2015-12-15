$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)(),
        oscillator,
        gain,
        trig = $('.trigger'),
        slider = $('.slider');
    
    $('.play').on('click', function(){
        soundToggle();
    });
    
    $(document).keypress(function(){
        soundToggle();
    });
    
    slider.slider({
        min: 0,
        max: 100,
        value: 80,
        slide: function(event, ui){
            $('.slider-test').text(Math.floor(ui.value/10));
            setVolume(ui.value/100);
        }
    });
  
    
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
        oscillator.type = 'sine';

        gain = context.createGain();
        gain.gain.value = 0.8;
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
    
    function setVolume (value) {
        gain.gain.value = value;
    }
});