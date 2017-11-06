function Main() {
    this.init()
}

$.extend(Main.prototype, {
	//初始化首页
    init: function() {   	
        $.ajax({
            url: "/users/list",
            data:{limit:10,skip:0}
        }).then((result => {
          // console.log(result)
          // 初始化后渲染列表 与分页列表
            this.renderList(result)
            this.renderPage(result)
        }))
    },

    //动态创建列表元素
    renderList: function(result) {
        result.list.forEach(function(ele, index) {

            var li = $('<li>').html(`
                <div class="media">
				    <div class="">
    				    <a href="detail.html?id=${ele._id}">
    				      <img class="media-object" src="http://localhost:3000${ele.imagePath}" alt="">
    				    </a>
				    </div>
				    <div class="">
    				    <p class="media-heading">
                            品牌：
                            <a href="detail.html?id=${ele._id}" title="查看详情">${ele.logo}</a>
                        </p>
				        <p class="media-heading"  class='content'>
                           颜色： ${ele.color}
                        </p>
                        <p class="media-heading"  class='content'>
                           价格： ${ele.price}
                        </p>
                        <p class="media-heading"  class='content' >
                            <a href="comment.html?id=${ele._id}&imagePath=${ele.imagePath}">评论</a>
                        </p>
				    
				  </div>
				  
				</div>`)

            $('#list').append(li)

        });
    },

    //动态创建分页元素
    renderPage:function(result){
    	//console.log(result.total)
    	var _this=this
    	var preli=$("<li>").html(`<a href="javascript:void(0)" aria-label="Previous">
	        <span aria-hidden="true">&laquo;</span>
	      </a>`)
	    	
    	$('.pagination').append(preli)
    	var pagenum=Math.ceil(result.total/10)
    	for(var i=0;i<pagenum;i++){
    		var li=$("<li>").html(`<a href="javascript:void(0)">${i+1}</a>`)

    		li.on('click',function(){
    			
    			_this.rerenderList(($(this).find("a").text()-1)*10)
    		})
    		$('.pagination').append(li)
    	}


    	var nextli=$('<li>').html(`<a href="javascript:void(0)" aria-label="Next">
	        <span aria-hidden="true">&raquo;</span>
	      </a>`)
    	//跳转到首页
    	//？？上一页
    	preli.on("click",function(){
    		_this.rerenderList((0)*10)
    	})

    	//跳转到尾页
    	//下一页
    	nextli.on("click",function(){
    		_this.rerenderList((pagenum-1)*10)
    	})

    	$('.pagination').append(nextli)

    },


    rerenderList:function(index){
    	$('#list').empty()
    	$.ajax({
			url:"/users/list",
			data:{limit:10,skip:index}

    	}).then(result=>{
    		//当前页码
    		console.log(result.pageNum)
    		this.renderList(result)
    	})
    }

})

new Main()
