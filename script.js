$(document).ready(function(){
    
    var context = new (window.AudioContext || window.webkitAudioContext)(),
        oscillator,
        gain,
        gainValue,
        pitchValue,
        trig = $('.trigger'),
        slider = $('.slider'),
        gainSlider = $('.gain'),
        pitchSlider = $('.pitch'),
        soundCalled = false;
    
    gainSlider.slider({
        min: 0,
        max: 100,
        value: 80,
        slide: function(event, ui){
            $('.gain-text').text(Math.floor(ui.value/10));
            gainValue = ui.value/100;
            if (soundCalled){
                setVolume(ui.value/100);
            }
        }
    });
    
    pitchSlider.slider({
        min: 200,
        max: 2000,
        value: 1085,
        slide: function(event, ui){
            $('.pitch-text').text(ui.value + 'hz');
            pitchValue = ui.value;
            if (soundCalled){
                setPitch(ui.value);
            }
        }
    });
    
    pitchValue = 1085;
    gainValue = slider.slider('value')/100;
    
    $('.play').on('click', function(){
        soundToggle();
    });
    
    $(document).keypress(function(){
        soundToggle();
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
        soundCalled = true;
        oscillator = context.createOscillator(); // Create sound source
        oscillator.type = 'sine';
        oscillator.frequency.value = pitchValue;
        gain = context.createGain();
        gain.gain.value = gainValue;
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
    
    function setPitch (value) {
        oscillator.frequency.value = value;
    }
});