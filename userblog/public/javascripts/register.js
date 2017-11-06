$(function(){
	console.log(window)
	$('.btn').on('click',function(){
		//alert(1)
		//console.log($('form').serializeObject())		
		$.ajax({
			url:"/clientuser/register",
			data:$('form').serializeObject(),
			method:"post",
			success:function(res){				
				if(res instanceof Object){
					//console.log(res)
					window.location.href='login.html'
				}else{
					//console.log(res)
					$('p').text(res)
				}				
			}
		})
	})



})

