$(function(){
	$('.btn').on('click',function(){
		//console.log($('form').serializeObject())
		$.ajax({
			url:"/clientuser/login",
			method:"post",
			data:$('form').serializeObject()
		}).then((result)=>{
			//console.log(result)
			if(result!='error'){
				window.location.href='index.html'
			}else{
				$('p').html("用户名或密码错误")
				//console.log("用户名或密码错误")
			}
							
		})
	})
})

