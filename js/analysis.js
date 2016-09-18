define(['settings', 'jquery-1.10.2'], function(settings){
	var Analysis = function(arg){
		$.extend(this, arg);
		this.init(arg);
	}
	Analysis.prototype = {
		cases: function(item){
			var str = '', me = this;
			if($.isArray(item)){
				str += me.analysisArray(item);
			}else if($.isPlainObject(item)){
				str += me.analysisObject(item);
			}else{
				str += item;
			}	
			return str;
		},
		analysisArray: function(data){
			var me = this,
				ul = "<ul class='sn-array' data-left='[' data-right=']'>";
			if($.isArray(data)){
				data.forEach(function(item, index, arr){
					ul += me.cases(item);
				})
			}
			ul += "</ul>";
			return ul;
		},
		analysisObject: function(data){
			var me = this,
				dl = "<dl class='sn-object' data-left='{' data-right='}'>"
			if($.isPlainObject(data)){
				$.each(data, function(item, key, obj){
					dl += "<dt>"+ item +"</dt>";
					dl += "<dd>"+ me.cases(data[item]) +"</dd>";
				})
			}
				dl += "</dl>";
			return dl;
		},
		set: function(data, result){
			this.data = data;
			if(!result){
				this.innerHTML = this.createDom(this.data);
			}
			return this;
		},
		createDom: function(data){
			var me = this;
			if($.isPlainObject(data)){
				return me.analysisObject(data);
			}	
			else if($.isArray(data)){
				return me.analysisArray(data);
			}else{
				return "";
			}	
		},
		events: [
			['click', '.' + settings['classname']['snobject'] + ',.' + settings['classname']['snarray'], 'pack'],
			['click', '.' + settings['classname']['pack'], 'unpack'],
			['mouseover', '.' + settings['classname']['snobject'] + ',.' + settings['classname']['snarray'], 'mouseenter'],
			['mouseout', '.' + settings['classname']['snobject'] + ',.' + settings['classname']['snarray'], 'mouseout']
		],
		delegate: function(){
			var me = this;
			me.events.forEach(function(item, index, arr){
				me.$el.on(item[0], item[1], me[item[2]]);
			});
			return me;
		},
		pack: function(e){
			if($(e.currentTarget).hasClass(settings['classname'].pack)){
				return;
			}
			$(e.currentTarget).addClass(settings['classname'].pack);
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		unpack: function(e){
			$(e.currentTarget).removeClass(settings['classname'].pack);
			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		mouseenter: function(e){
				$('.' + settings['classname'].mouseenter)
				.removeClass(settings['classname'].mouseenter);
			$(e.currentTarget).addClass(settings['classname'].mouseenter);
			return false;
		},
		mouseout: function(e){
			var $tar = $(e.currentTarget);
			$tar
				.removeClass(settings['classname'].mouseenter);
			return false;
		},
		setDom: function(){
			this.$el.append(this.innerHTML)
			return this;
		},
		setData: function(data, result){
			var me = this;
			me.data = data;
			if(!result){
				me.innerHTML = me.createDom(me.data);
			}
			me.set(me.data).setDom().delegate();
			return me;
		},
		init: function(arg){
			var me = this;
			me.$el = $(me.$el)
			if(me.data){
				me.setData(me.data);
			}
			
		}
	}
	return Analysis;
})







































