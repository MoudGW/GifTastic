	var topics=['john snow', 'arya', 'Dog', 'little finger', 'dragons', 'Cat', 'hodor', 'stark', 'khalisi','king of north'];
	var selected;
	var gifsrc=[];
	var gifsrc_st=[];
	$("document").ready(function(){
		displaybuttons();
		$(".buttons").click(function(){
			if($(this).text()==='submit')
			{
				var x=$('input[name=word]').val();
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
			}

		});
	});
	function displaybuttons()
	{
		for(var i=0;i<topics.length;i++)
		{
			$('#header').append("<button class='buttons'>"+topics[i]+'</button>');
		}
	}
	function displaygiphy(){

		var data = $.get("http://api.giphy.com/v1/gifs/search?q="+selected+"&api_key=130b319820eb4d44ac4bc32e4ee79cdb&limit=10");
		data.done(function(data) 
		{
			for (var i = 0; i < data.data.length; i++) 
			{
				$('#left').append("<div class='giphy'><p>Rating :"+data.data[i].rating+"</p><img class='images' id='"+i+"' src='"+data.data[i].images.original_still.url+"'/></div>");
			    gifsrc.push(data.data[i].images.original.url);
			    gifsrc_st.push(data.data[i].images.original_still.url);
			}
		});
        $(document).on("click", ".images", pausePlay);
        function pausePlay(){
        var src=$(this).attr('src');
        var x=parseInt($(this).attr('id'));
        console.log(gifsrc.indexOf(src));
        if(gifsrc.indexOf(src)>0)
		{
	    $(this).attr('src',gifsrc_st[x]);	
	    }
	    if(gifsrc_st.indexOf(src)>0)
		{
	    $(this).attr('src',gifsrc[x]);	
	    }
	}
	}