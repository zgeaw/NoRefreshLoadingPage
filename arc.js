/*ARC 无刷新加载页面插件 32237384@qq.com*/
var arcajxatab = function(options){
	var opts = {
		ajax_tab:'.arc_menu',
		ajax_content:'content',
		ajax_num:4,
		ajax_id:'ajax_id_',
		ajax_title:'项目',
		default_url:'',
		default_id:'',
		default_title:'首页',
		url_type:'.html'
	}
	if(options) {//判断是否传入配置项
		$.extend(opts, options);
	}
	
	this.ajax_open = function(url,id,title){//加载事件
		ajax_open(url,id,title);
	}
	var ajax_open = function(url,id,title){
		var _sel = $('#'+opts.ajax_id+id),
			  _obj = $('.'+opts.ajax_content+'_li'),
			  _tab = $(opts.ajax_tab).find('>li');
		_sel.load(url+opts.url_type);
		_obj.hide().eq(id).show();
		_tab.eq(id).addClass('active').siblings().removeClass('active');
		_tab.eq(id).find('a').text(title);
		seturl(url,id,title);
	}
	
	this.click = function(id){//外部点击事件
		$(id).bind('click',function(){
				var _this = $(this),	
					  _dataurl = _this.attr('data-url'),
					  _title = $.trim(_this.text());
				ajax_open(_dataurl,opts.ajax_num-1,_title);
		});
	}	
	
	var ajaxEvent = function() {//注册事件
		var _sel = $(opts.ajax_tab).find('>li');
		_sel.each(function(i){
			var _this = $(this),
				 _val = getUrlParam('uid');
				 if(_val == i){				 	
					_this.addClass('active').siblings().removeClass('active');
				 }
			_this.find('a').bind('click',function(){
				var _this = $(this),
					 _dataurl = _this.attr('data-url'),
					 _title = $.trim(_this.text());
				ajax_open(_dataurl,i,_title);
				_this.parent().addClass('active').siblings().removeClass('active');
			});
		});
	}	
	
	var seturl =function(url,id,title){//修改地址栏
		var _title=opts.ajax_title;
		if(title!=undefined){
			_title=opts.ajax_title+'-'+title;
		}
		document.title = _title;
		history.pushState({ title: _title }, _title, location.href.split("?")[0] + "?moudel=" + url+'&uid='+id+'&title='+escape(title));
	}	
	
	this.init = function() {//初始化
		buildpage();
	}
	var buildpage = function() {
		for(var i =0; i<opts.ajax_num;i++){
			ajax_html(opts.ajax_id+i);
		}
		var _url = getUrlParam('moudel'),
			 _id =getUrlParam('uid'),
			 _title =getUrlParam('title');
		if(_url==null || _url==''){
			_url = opts.default_url;
		}
		if(_id==null || _id==''){
			_id = opts.default_id;
		}
		if(_title==null || _title==''){
			_title = opts.default_title;
		}
		ajax_open(_url,_id,_title);
		ajaxEvent();		
	}
	
	var ajax_html = function(id){//构建页面
		var _html = [],sel=$('.'+opts.ajax_content);		
		_html = '<div id="'+id+'" class="'+opts.ajax_content+'_li"></div>';	
		sel.append(_html);
	}		
	
	function getUrlParam(name){//获取地址栏参数
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) return unescape(r[2]); return null; //返回参数值
	} 
}