var Analysis = function(arg){
	_.extend(this, arg);
	this.init(arg);
}
Analysis.prototype = {
	cases: function(item){
		var str = '', me = this;
		if(_.isArray(item)){
			str += me.analysisArray(item);
		}else if(_.isObject(item)){
			str += me.analysisObject(item);
		}else{
			str += item;
		}	
		return str;
	},
	analysisArray: function(data){
		var me = this,
			ul = "<ul class='sn-array' data-left='[' data-right=']'>";
		if(_.isArray(data)){
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
		if(_.isObject(data)){
			_.foreach(data, function(item, key, obj){
				dl += "<dt>"+ key +"</dt>";
				dl += "<dd>"+ me.cases(item) +"</dd>";
			})
		}
			dl += "</dl>";
		return dl;
	},
	get: function(data, result){
		this.data = data;
		if(!result){
			this.innerHTML = this.createDom(me.data);
		}
		return this;
	},
	createDom: function(data){
		var me = this;
		if(_.isObject(data)){
			return me.analysisObject(data);
		}	
		else if(_.isArray(data)){
			return me.analysisArray(data);
		}else{
			return "";
		}	
	},
	init: function(arg){
		var me = this;
		if(me.data){
			me.innerHTML = me.createDom(me.data);
		}
	}
}







































