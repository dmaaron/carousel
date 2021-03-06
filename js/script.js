$(document).ready(function() {
    //rotation speed and timer
    // var speed = 5000;
    // var run = setInterval('rotate()', speed);
    
    //grab the width and calculate left value
    var item_width = $('#slides li').outerWidth();
    var left_value = item_width * (-1);


    function set_button_color(){
        $('#slides li').each(function(i){ //goes through each slide
            if($(this).position().left==500){ //finds which one is currently visible based on position
                var this_slide = $(this).index(); // gets the index of the currently visible slide
                var prev_color = $('#slides li').eq(this_slide-1).css('background-color'); //sets the previous button to be the background color of the previous slide
                var next_color = $('#slides li').eq(this_slide+1).css('background-color');//sets the next button to be the background color of the next slide
            $('#prev').css({'background-color': prev_color});
            $('#next').css({'background-color': next_color});
            }
        });
    }

    //move the last item before first item, just in case user click prev button
    $('#slides li:first').before($('#slides li:last'));
    
    //set the default item to the correct position 
    $('#slides ul').css({'left' : left_value});
    set_button_color();

    //if user clicked on prev button
    $('#prev').click(function() {
        //get the right position            
        var left_indent = ($('#slides ul').position().left) + item_width;
        //slide the item            
        $('#slides ul').animate({'left' : left_indent}, 200,function(){
            //move the last item and put it as first item                
            $('#slides li:first').before($('#slides li:last'));
            //set the default item to correct position
            $('#slides ul').css({'left' : left_value});
            set_button_color();
        });
        //cancel the link behavior            
        return false;
            
    });
    //if user clicked on next button
    $('#next').click(function() {
        //get the right position
        var left_indent = ($('#slides ul').position().left) - item_width;
        //slide the item
        $('#slides ul').animate({'left' : left_indent}, 200, function () {
            //move the first item and put it as last item
            $('#slides li:last').after($('#slides li:first'));
            //set the default item to correct position
            $('#slides ul').css({'left' : left_value});
            set_button_color();
        });
        //cancel the link behavior
        return false;
        
    });
    
    //pause the auto rotation on mouse hover, otherwise rotate it
    $('#slides').hover(
        function() {
            clearInterval(run);
        },
        function() {
            run = setInterval('rotate()', speed);
        }
    );
});

//a simple function to click next link
//a timer will call this function, and the rotation will begin :)  
// function rotate() {
//     $('#next').click();
// }