var _ = {
	//选择dom
	$: function(selector, flag){
		return document[flag? 'querySelectorAll': 'querySelector'](selector)
	},
	//是否为函数
	isFunction: function(arg){
		return _.toString(arg, 'Function') !== -1;
	},
	//是否为数组
	isArray: (function(){
		return Array.isArray 
		|| function(arg){  return _.toString(arg, 'Array') !== -1 }
	})(),
	//是否为对象
	isObject: function(arg){
		return _.toString(arg, 'Object') !== -1;
	},
	//是否为字符串
	isString: function(arg){
		return _.toString(arg, 'String') !== -1;
	},
	//遍历对象属性
	foreach: function(data, callback){
		for(var key in data){
			if(data.hasOwnProperty(key)){
				callback(data[key], key, data);
			}
		}
	},
	/**
	*@description 判断conten是否为type类型
	*@content {object||array||string}
	*@type {string} ['Array', 'Object', 'String', 'Function']
	*@return {number} [-1, Math.abs(number)]
	*/
	toString: function(content, type){
		return Object.prototype.toString.call(content).indexOf(type);
	},
	/**
	*@description 继承
	*@param origin {object} 原始对象
	*@param implement {object} 需要被继承的对象
	*@param dependent {boolean} 是否创建新的对象
	*@return object
	*/
	extend: function (origin, implement, dependent) {
 		var me = this,
 		tar = dependent? {}: origin;
		if(dependent){
			return me.extend(me.extend(tar, origin), implement);
		}else{
			for(var key in implement){
				origin[key] = implement[key];
			}
			return origin;
		}
	},
	checkParentNode: function(target, targetselector){
		var reg_id = /^#[\w\-]{1,}/,
			reg_class = /^\.[\w\-]{1,}/,
			reg_id_attr = /\[[\w]{1,}\]/,
			reg_id_attr_value = /\[([\w\$]{1,})\=([\S]{1,})\]/,
			tag = target.tagName,
			id = target.getAttribute('id'),
			condition = [],
			status = true;





		if(tag == 'HTML'){
			return false;
		}

	},
	bind: function(selector, _event, callback, targetselector){
		var selector = _.isString(selector)? _.$(selector): selector;
		if(targetselector){
			callback = function(e){
				#id
				.class
				.class[data = asdsd]
				#id[data = sedfdf]
				[data]
				[data=sdfsdf]
			}
		}
		
		selector.addEventListener(_event, callback)
	}

}





