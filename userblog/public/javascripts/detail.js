var id=window.location.search.split('?')[1].split('=')[1]

$.ajax({
	url:"users/detail",
	data:{id:id},
	method:"post"
}).then(result=>{
	//console.log(result)
	var div=$("<div>").html(`<div class="panel panel-default">
		<div class="panel-heading">商家:${result[0].author}</div>
		  <div class="panel-body">
		  	<div style="overflow:hidden">
			  	<img src="http://localhost:3000${result[0].imagePath}" style="width:300px" class="navbar-left">
			  	<div class="navbar-left" id="pro_detail">
			  	    <p>品牌：
			  	       ${result[0].logo}
			  	    </p>
			  	    <p>颜色：
			  	        ${result[0].color}
			  	    </p>
			  	    <p>价格：
			  	       ￥${result[0].price}
			  	    </p>
			  	    <p>材质：
			  	       ${result[0].texture}
			  	    </p>
			  	    
			  	</div>
		  	</div>
		   <div style="border-top:1px dashed #ccc;padding:10px 0">描述：
		       ${result[0].content}
		   </div>		    
		  </div>		  
		</div>`)
		
	$('.detail').append(div)
})



$.ajax({
	url:"/comment/list",
	data:{pro_id:id}
}).then(result=>{
	console.log(result)
	if(result.length>0){
		result.forEach( function(element, index) {
			var tr=$("<tr>").html(`<td style='width:200px'>${element.commentUser}</td>
	  						<td>${element.eval}</td>
	  						<td>${element.eval_content}</td>`)
			$('tbody').append(tr)
		});

		
	}
})




