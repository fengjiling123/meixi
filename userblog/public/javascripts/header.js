$(function(){
	$(".collapse").load("header.html",function(){
		$(".login").hide()
		$.ajax({
			url:"/clientuser/getLoginUser",
			method:"post"
		}).then(result=>{
			//console.log(result)
			if(result!='error'){
				//console.log(result)
				$(".login").show();
				$('.unlogin').hide();
				currentUser=JSON.parse(result)
				console.log(currentUser)
				$('.currentUser').find('span').html(currentUser.currentUser)
				$('.tounlogin').on('click',function(){
					$.ajax({
						url:"/clientuser/unLogin",
						method:"post"
					}).then(result=>{
						console.log(result)
						window.location.href="login.html"
						// $(".login").hide();
						// $('.unlogin').show();
					})
				})
			}else{
				$(".login").hide();
				$('.unlogin').show();
			}
		})


	})


})