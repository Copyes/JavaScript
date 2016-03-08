/*
	created by fanchao
 */

window.onload = function(){
	var oList = document.getElementById('list'),
		oBoxs = oList.children;
	var timer = null;

	//格式化时间格式
	function formateDate(date){
		var year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDay(),
			hours = date.getHours(),
			minnutes = date.getMinutes();
		month =  month > 9 ? month : '0'+ month;

		return year + '-'+ month+ '-' + day + ' ' + hours + ':' + minnutes;
	}
	//删除内容
	function removeNode(node){
		node.parentNode.removeChild(node);
	}

	//赞内容
	function praiseBox(box,el){
		var txt = el.innerHTML,
			praiseTotal = box.getElementsByClassName('goodNum')[0],
			oldPraiseNum = praiseTotal.getAttribute('total'),
			newPraiseNum ;

		if(txt = '赞'){
			newPraiseNum = oldPraiseNum + 1;
			praiseTotal.getAttribute('total',newPraiseNum);
			praiseTotal.innerHTML = (newPraiseNum == 1) ? '我觉得很赞' : '我和' + oldPraiseNum + '人觉得很赞';
			el.innerHTML = '取消赞';
		}else{
			newPraiseNum = oldPraiseNum - 1;
			praiseTotal.getAttribute('total',newPraiseNum);
			praiseTotal.innerHTML = (newPraiseNum == 1) ? ' ' :  newPraiseNum + '人觉得很赞';
			el.innerHTML = '赞';
		}
	}
	//赞回复
	
	//发表评论
	function relay(box,el){
		var commentList = document.getElementsByClassName('commit-list')[0],
			textArea = document.getElementByClassName('text-comment')[0],
			commentBox = document.createElement('div');
		commentBox.className = 'commit-box clearfix';
		commentBox.setAttribute('user','self');
		commentBox.innerHtml = 
		'<img class="myhead" src="images/my.jpg">'+
		'<div class="comment">'+
			'<p class="comment-text">'+
				'<span class="user">我：</span>'+
				textArea.value
			'</p>'+
			'<p class="comment-time">'+
                2014-02-19 14:36
                '<a href="javascript:;" class="comment-praise" total="1" my="0">1 赞</a>'+
                '<a href="javascript:;" class="comment-del">删除</a>'+
			'</p>'+
		'</div>';
	}

	//利用事件委托将事件委托给每条内容的div
	for (var i = 0 ,len = oBoxs.length; i < len; i++) {
		oBoxs[i].onclick = function(e){
			var e = e || window.e;
			var el = e.srcElement;

			switch(el.className){
				//关闭按钮
				case 'close': removeNode(el.parentNode);
				break;
				//赞内容
				case 'good': praiseBox(el.parentNode.parentNode.parentNode,el);
				break;
				//发表评论
				case 'btn': relay(el.parentNode.parentNode.parentNode,el);
				break;
				
			}
		}
	}
}