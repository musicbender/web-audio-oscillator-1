$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)(),
        oscillator,
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
            oscillator.connect(context.destination); // Connect sound to output
            oscillator.type = 'sine';
            oscillator.start();
            trig.text('Stop');
        }
        else {
            oscillator.stop();
            trig.text('Play');
        }
    }
});