$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)(),
        oscillator,
        gain,
        trig = $('.trigger');
    
    $('.play').on('click', function(){
        playToggle();
    });
    
    $(document).keypress(function(){
        playToggle();
    });
    
    function playToggle () {
        trig.toggleClass('stop').toggleClass('play');
        
        if (trig.hasClass('stop')){
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
        else {
            oscillator.stop();
            oscillator.disconnect();
            trig.text('Play');
        }
    }
});