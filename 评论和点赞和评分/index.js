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
	function praiseRelay(el){
		var myPraise = parseInt(el.getAttribute('my')),
			oldPraise = parseInt(el.getAttribute('total')),
			newTotal;

		if(myPraise == 0){
			newPraise = oldPraise + 1;
			el.setAttribute('total',newPraise);
			el.setAttribute('my',1);
			el.innerHTML = newTotal + '取消赞';
		}else{
			newPraise = oldPraise - 1;
			el.setAttribute('total',newPraise);
			el.setAttribute('my',0);
			el.innerHTML = (newTotal == 0)?'赞' : newTotal+ '赞';
		}

		el.style.display = (newTotal == 0) ? '' : 'inline-block';

	}
	//发表评论
	function relay(box,el){
		var commentList = document.getElementsByClassName('commit-list')[0],
			textArea = document.getElementsByClassName('text-comment')[0],
			commentBox = document.createElement('div');
		commentBox.className = 'commit-box clearfix';
		commentBox.setAttribute('user','self');
		commentBox.innerHTML = 
		'<img class="myhead" src="images/my.jpg">'+
		'<div class="comment">'+
			'<p class="comment-text">'+
				'<span class="user">我：</span>'+
				textArea.value +
			'</p>'+
			'<p class="comment-time">'+
                formateDate(new Date()) +
                '<a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>'+
                '<a href="javascript:;" class="comment-del">删除</a>'+
			'</p>'+
		'</div>';

		commentList.appendChild(commentBox);
		textArea.value = '';
        textArea.onblur();
	}
	//操作回复
	function operate(el){
		var commentBox = el.parentNode.parentNode.parentNode,
			box = commentBox.parentNode.parentNode.parentNode;
		var txt = el.innerHTML;
		var user = commentBox.getElementsByClassName('user')[0].innerHTML;
		var textArea = box.getElementsByClassName('text-comment')[0];

		if(txt == '回复'){
			textArea.focus();
			textArea.value = '回复' + user;
			textArea.onkeyup();
		}else{
			removeNode(commentBox);
		}
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
				//回复按钮灰
                case 'btn btn-off':
                    clearTimeout(timer);
                break;

				case 'comment-praise': praiseRelay(el);
				break;

				case 'comment-del': operate(el);
				break;
			}
		}
		//评论
		var textArea = oBoxs[i].getElementsByClassName('text-comment')[0];

		//点评获取焦点
		textArea.onfocus = function(){
			this.parentNode.className = 'text-box text-box-on';
			this.value = this.value == '评论...' ? '' : this.value;
			this.onkeyup();
		}
		//点评失去焦点
		textArea.onblur = function(){
			var self = this;
            var val = self.value;
            if (val == '') {
                timer = setTimeout(function () {
                    self.value = '评论…';
                    self.parentNode.className = 'text-box';
                }, 200);
            }
		}

		//评论键盘事件
		textArea.onkeyup = function(){
			var value = this.value;
				len = value.length,
				elems = this.parentNode.children,
				btn = elems[1],
				words = elems[2];

			if(len>140  || len<=0){
				btn.className = 'btn btn-off';
			}else{
				btn.className = 'btn';
			}

			words.innerHTML = len + '/140';
		}
	}









}