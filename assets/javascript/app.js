    // declarate Globale variables  
	var topics=['John snow', 'Arya', 'Dog', 'Little finger', 'Dragons', 'Cat', 'Hodor', 'Stark', 'khaleesi','King of north','Cersei'];
	var selected;
	var gifsrc=[];
	var gifsrc_st=[];
	// main function triggered once the html is loaded in the browser
	$("document").ready(function(){
		// call function display buttons
		displaybuttons();
		// add a click listener on buttons 
		$(".buttons").click(function(){
			if($(this).text()==='submit')
			{
				var x=$('input[name=word]').val().trim();
				$('input[name=word]').val('');
				if(x!=''){
				topics.push(x);
		      	}
				$('#header').text('');
				displaybuttons();
				$('#left').text('');
				displaygiphy();
			}else{
				$('#left').text('');
				selected=$(this).text();
				displaygiphy();
				$(this).css("opacity","0.6");
			}

		});
		// add hover effect on buttons to help the user to remember the buttons already clicked
 		$(".buttons").hover(function(){
        $(this).css("background-color", "white");
        $(this).css("color", "#0074D9");
        }, function(){
        $(this).css("background-color", "#0074D9");
        $(this).css("color", "white");

    });
	});
	// declarate function display buttons
	function displaybuttons()
	{
		for(var i=0;i<topics.length;i++)
		{
			$('#header').append("<button class='buttons'>"+topics[i]+'</button>');
		}
	}
	// declarate function display gifs
	function displaygiphy(){
        // fetch our data from server
		var data = $.get("http://api.giphy.com/v1/gifs/search?q="+selected+"&api_key=130b319820eb4d44ac4bc32e4ee79cdb&limit=10");
		// when the request of data is finished 
		data.done(function(data) 
		{
			for (var i = 0; i < data.data.length; i++) 
			{
				// we will display gif as images and get the still and animated images Url stocked in two different Arrays 
				$('#left').append("<div class='giphy'><p>Rating :"+data.data[i].rating+"</p><img class='images' id='"+i+"' src='"+data.data[i].images.original_still.url+"'/></div>");
			    gifsrc.push(data.data[i].images.original.url);
			    gifsrc_st.push(data.data[i].images.original_still.url);
			}
		});
		// add a click listner on .images and triggred function pausePlay 
        $(document).on("click", ".images", pausePlay);
        // declarate function pausePlay 
        function pausePlay(){
        // take the clicked gif img src and id 	
        var src=$(this).attr('src');
        var x=parseInt($(this).attr('id'));
        // check if it is a gif, if so give it the src of an img
        if(gifsrc.indexOf(src)>0)
		{
	    $(this).attr('src',gifsrc_st[x]);	
	    }
	    // check if it is a img, if so give it the src of an gif
	    if(gifsrc_st.indexOf(src)>0)
		{
	    $(this).attr('src',gifsrc[x]);	
	    }
	}
	}