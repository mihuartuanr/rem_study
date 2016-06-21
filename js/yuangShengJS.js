// JavaScript Document
/* 0.获取ID元素 */
function Id(id){
	return document.getElementById(id);
}

/* 1.获取className的元素*/
function className(parentObj,className,childObj){
	var arr = [];
	var aEls = childObj?parentObj.getElementsByTagName(childObj):parentObj.getElementsByTagName('*');
	for(var i=0;i<aEls.length;i++){
		if(aEls[i].className != ''){
			var str = aEls[i].className.split(' ');
			for(var j=0;j<str.length;j++){
				if(str[j] == className){
					arr.push(aEls[i]);
					break;
				}
			}
		}
	}
	return arr;
}


/* 2.用tagName获取元素 */
function getName(oParent,name){
	return name?oParent.getElementsByTagName(name):document.getElementsByTagName(oParent);
}


/* 3.获取制定class元素的index */
function objIndex(ObjList,className){
	for(var i=0;i<ObjList.length;i++){
		var str = ObjList[i].className.split(' ');
		for(var j=0;j<str.length;j++){
			if(str[j] == className)return i;
		}
	}
	return -1;
}


/* 4.获取className下的元素 */
function classObj(classN,obj){
	var arr = [];
	var objList = className(document,classN,'*');
	for(var i=0;i<objList.length;i++){
		var aList = objList[i].getElementsByTagName(obj);
		for(var j=0;j<aList.length;j++){
			arr.push(aList[j]);
		}
	}
	return arr;
}


/* 5.removeClass封装函数 */
function removeClass(obj,className){
	var strName = obj.className.split(' ')
	for(var i=0;i<strName.length;i++){
		if(strName[i] == className)strName.splice(i,1);
	}
	obj.className = strName.join(' ');
}



/* 6.addClass封装函数 */
function addClass(obj,className){
	if(obj.className == ''){
		obj.className = className;	
	}else{
		var str = obj.className.split(' '),
			b;
		for(var i=0;i<str.length;i++){
			if(str[i] == className)return;
		}
		obj.className = str.join(' ')+' '+className;
	}
}


/* 7.获取元素的样式 */
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}


/* 8.获取所有子节点 */
function allChild(obj){
	var arr = [],
		list = obj.childNodes;
	for(var i=0;i<list.length;i++){
		if(list[i].nodeType == 1)arr.push(list[i]);
	}
	return arr;
}


/* 9.获取元素的下一个兄弟节点 */
function nextSb(obj){
	return obj.nextSibling.nodeType == 3?obj.nextSibling.nextSibling:obj.nextSibling;
}


/* 10.获取元素的上一个兄弟节点 */
function prevSb(obj){
	return obj.previousSibling.nodeType == 3?obj.previousSibling.previousSibling:obj.previousSibling;
}


/* 11.判断数字是不是小数 */
function floorNum(num){
	return num===parseInt(num)?false:true;
}


/* 12.元素隐藏函数 */
function hideFn(obj,num,attr){
	obj.timer = setInterval(function(){
		var speed = parseInt(getStyle(obj,attr))-num;
		if(speed<0)speed = 0;
		obj.style[attr] = speed + 'px';
		if(speed == 0)clearInterval(obj.timer);
	},13);
}


/* 13.元素出现函数 */
function showFn(obj,num,attr,range){
	obj.timer = setInterval(function(){
		var speed = parseInt(getStyle(obj,attr))+num;
		if(speed>range)speed = range;
		obj.style[attr] = speed + 'px';
		if(speed == range)clearInterval(obj.timer);
	},13);
}

/* 14.元素隐藏函数(num是0~1之间的数字) */
function filterH(obj,num,range){
	obj.timer = setInterval(function(){
		var speed = parseFloat(getStyle(obj,'opacity'))-num;
		if(speed<range)speed = range;
		!-[1,]?obj.style.filter = 'alpha(opacity='+ speed*100 +')':obj.style.opacity = speed;
		if(speed == range){
			obj.style.display = 'none';
			clearInterval(obj.timer);
		}
	},13);
}


/* 15.元素出现函数 */
function filterS(obj,num,range){
	obj.style.display = 'block';
	obj.timer = setInterval(function(){
		var speed = parseFloat(getStyle(obj,'opacity'))+num;
		if(speed>range)speed = range;
		!-[1,]?obj.style.filter = 'alpha(opacity='+ speed*100 +')':obj.style.opacity = speed;
		if(speed == range)clearInterval(obj.timer);
	},13);
}
	
	
/* 14.返回顶部 */
function returnTop(obj){
	obj.timer = setInterval(function(){
		var leg = _scrollTop - _scrollTop/14;
		if(leg <= 0){
			leg = 0;
			clearInterval(obj.timer);
		}
		if(document.body.scrollTop){
			document.body.scrollTop = leg;
		}else{
			document.documentElement.scrollTop = leg;
		}
	},20)
}


/* 15.返回底部 */
function returnBom(obj,endNum){
	obj.timer = setInterval(function(){
		var leg = _scrollTop + 100;
		if(leg >= endNum){
			leg = endNum;
			clearInterval(obj.timer);
		}							
		if(document.body.scrollTop){
			document.body.scrollTop = leg;
		}else{
			document.documentElement.scrollTop = leg;
		}
	},20)
}


/* 16.返回顶部显示与隐藏 */
function showHidn(){
		_scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		_scrollTop > 440 && parseInt(oFoot.offsetTop) - parseInt(_scrollTop) - 400 > 0?fixedBox.style.display = 'block':fixedBox.style.display = 'none';
}


/* 17.震动函数 */
function shakeFn(obj){
	
}


/* 18.淘宝大图展示函数 */
function MaxImg(wrap,yellow,maxImg,maxWrap){
	
	wrap.onmouseenter = function(){
	yellow.style.display = maxWrap.style.display = 'block';
		
	}
	
	document.onmousemove = function(ev){
		
		var ev = ev || event;
		var sTop= document.body.scrollTop || document.documentElement.scrollTop;
		var disX = ev.clientX - yellow.offsetWidth/2 - wrap.offsetLeft;
		var disY = ev.clientY - yellow.offsetHeight/2 - wrap.offsetTop +sTop ;
		var disW = wrap.offsetWidth - yellow.clientWidth;
		var disH = wrap.offsetHeight - yellow.clientHeight
		var offW = maxImg.offsetWidth - maxWrap.clientWidth;
		var offH = maxImg.offsetHeight - maxWrap.clientHeight;
		
		if(disX < 0){
			disX = 0;	
		}else if(disX > disW){
			disX = disW;
		}
		
		if(disY < 0){
			disY = 0
		}else if(disY > disH){
			disY = disH;
		}
		
		yellow.style.left = disX + 'px';
		yellow.style.top = disY + 'px';
		
		maxImg.style.left = (disX/disW)*offW*-1 + 'px';
		maxImg.style.top = (disY/disH)*offH*-1 + 'px';
	}
	
	wrap.onmouseleave = function(){
		yellow.style.display = maxWrap.style.display = 'none';	
		wrap.onmousemove = null;
	}	
}


/* 19.banner渐隐渐现(引用时应在外部定义boolean为布尔值变量) */
function filterFn(obj,nowObj,className){ // 渐隐渐显动画函数
	if(boolean)
		clearInterval(obj.timer);
		boolean = !boolean;
		var num = 0.1;
		var ie = !-[1,];
		obj.className = className;
		obj.style.zIndex = 1;
		nowObj.style.zIndex = 0;
		nowObj.className = '';
		obj.timer = setInterval(function(){
			num += 0.1;
			if(num >=1) num = 1;
			ie?obj.style.filter = 'alpha(opacity='+ (num*100) +')':obj.style.opacity = num;
			if(num == 1){
				clearInterval(obj.timer);
				nowObj.style.opacity = 0;
				nowObj.style.filter = 'alpha(opacity=0)';
				boolean = !boolean;
			}
		},40);	
}


/* 20.无缝滚动函数(引用时应在外部定义boolean为布尔值变量) */
function rollFL(obj,num,range,list1){  // 列表左右切换的无缝轮播函数
	if(isBoolean){
		if(obj.scrollLeft == 0&&range<0)obj.scrollLeft += list1.offsetWidth;
		isBoolean = !isBoolean;
		clearInterval(obj.timer);
		var _scrollLeft = obj.scrollLeft;
		obj.timer = setInterval(function(){
			var speed = obj.scrollLeft + num;
			if(speed >=_scrollLeft+range&&range>0 || speed<=_scrollLeft+range&&range<0)speed = _scrollLeft + range;
			obj.scrollLeft = speed;
			if(speed == _scrollLeft + range){
				if(list1.offsetWidth - obj.scrollLeft <= 0&&range>0)obj.scrollLeft -= list1.offsetWidth; 
				isBoolean = !isBoolean;
				clearInterval(obj.timer);
			}
		},20);	
	}
}


/* 21.任意值运动框架 */
function startMove(obj,attr,iTarget,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var cur=0;
		if(attr=='opacity'){
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);	
		}else{
			cur=parseInt(getStyle(obj,attr));	
		}
		var speed=(iTarget-cur)/6;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);	
		
		if(cur==iTarget){
			clearInterval(obj.timer);
			if(fnEnd) fnEnd();	
			
		}else{
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';	
			}
		}
	},30);
}
/* 22.完美运动框架 */
function moveJson(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true; //假设所有的值都到了
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);	
			}else{
				cur=parseInt(getStyle(obj,attr));	
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);	
			
			if(cur!=json[attr]){
				bStop=false;		
			}

			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';	
			}	
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd) fnEnd();	
		}	
	},30);
}



/* rem布局设置函数 */
function remFn(num){
	window.document.documentElement.style.fontSize = document.documentElement.clientWidth/num+'px';
}









