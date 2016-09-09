(function (root, factory, name) {
    if (typeof exports === 'object') {
        module.exports = factory();
         
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
         
    } else {
        root[name] = factory();
    }
})(this, function() {
    // module
    return {
		//选择dom
		$: function(selector, flag){
			return document[flag? 'querySelectorAll': 'querySelector'](selector)
		},
		//是否为函数
		isFunction: function(arg){
			return this.toString(arg, 'Function') !== -1;
		},
		//是否为数组
		isArray: (function(){
			return Array.isArray 
			|| function(arg){  return this.toString(arg, 'Array') !== -1 }
		})(),
		//是否为对象
		isObject: function(arg){
			return this.toString(arg, 'Object') !== -1;
		},
		//是否为字符串
		isString: function(arg){
			return this.toString(arg, 'String') !== -1;
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
		trim: function(str){
			return str.replace(/(^\s{1,}|\s{1,}$)?/g, '')
		},
		leftTrim: function(str){
			return str.replace(/^\s{1,}/, '');
		},
		rightTrim: function(){
			return str.replace(/\s{1,}$/, '');
		},
		//取得元素属性
		getAttr: function(ele, attr){
			return ele.getAttribute(attr);
		},
		checkIdSelector: function(selector){
			var	reg_id = /^#[\w\-]{1,}/;
			return selector.match(reg_id);
		},
		selectorReg:[
			{
				key: 'id',
				reg: /\#([\w]{1,}[\w\-\_]*)/g,
				//把selector通过reg检测之后的结果封装
				handler: function(result){
					var pass = false;	
					if(result instanceof Array){
						result = result[1];
						pass = true;
					}
					return {
						//属性名
						name: 'id',
						//属性值
						value: result,
						//是否存在于被检查的selector中
						pass: pass
					}
				},
				/**
				*查检selector的拆出来的结果与传过来的值是否相等
				*@param result {object} 代表hanlder的结果
				*@param tarValue {string} id的值
				*@param tarKey {string} tarkey此时代表'id';['id', 'class', 'data-xxx'];可能会用到
				*/
				check: function(result, tarValue){
					return result['value'] == tarValue;
				}
			},
			{
				key: 'class',
				reg: /\.([\w]{1,}[\w\-\_]*)/g,
				handler: function(result){
					var pass = false;
					if(result instanceof Array){
						result = result[1];
						pass = true;
					}
					return {
						name: 'class',
						value: result,
						pass: pass
					}
				},
				check: function(result, tarValue){
					return new RegExp('\b'+ result['value'] +'\b').test(tarValue);
				}
			},
			{
				key: 'attr',
				reg: /\[([\w\-\_]{1,})(\={0,1})([\w\-\_]*)\]/g,
				handler: function(result){
					var pass = false, name = null, value = null;
					if(result instanceof Array){
						pass = true;
						name = result[1];
						value = result[2]	
					}
					return{
						name: name,
						value: value,
						pass: pass
					}
				},
				check: function(result, tarValue){
					var res = true;
					if(result['value'] && result['value'] != tarValue){
						return false;
					}
					//如果tarvalue === null说明没有tarkey
					if(tarValue === null){
						return false;
					}
					
					if(tarValue !== null && tarValue != result['value']){
						return false;
					}
					return true;	
				}
			},
			{
				key: 'tag',
				reg: /^[\w]{1,}[\w\_\-]*/,
				handler: function(result){
					var pass = false, name = null, value = null;
					if(result instanceof Array){
						value = name = result[0];
						pass = true;
					}
					return{
						name: name,
						value: value,
						pass: pass
					}
				},
				check: function(result, tarValue){
					var $tar = this,
						tagName = $tar.tagName;
					return tagName.toUpperCase() == result['name'].toUpperCase()? tagName: false;
				}
			}
		],
		analysisSelector: function(selector){
			var me = this, result = [];
			me.selectorReg.forEach(function(item, index, arr){
				result.push(
					item['handler'](
						item['reg'].exec( selector )
					)
				);
			}, me);
			return result;
		},
		//检查当前node是否符合要求
		checknode: function(target, targetselector){
			var me = this,
			//检测是否是id选择器
				result = me.analysisSelector(targetselector),
				right = true, 
				pass = 0,
				regArr = me.selectorReg;
			result.forEach(function(item, index, arr){
				if( item['pass'] 
					&& !regArr[index]['check'].call(target, item, me.getAttr(target, item['name'])) 
				){
					right = false;
				}else if(item['pass']
					
						&& regArr[index]['check'].call(target, item, me.getAttr(target, item['name'])) 
					){
					pass++;
				}
			}, me)
			return right&&pass? target: false;
		},
		checkParentNode: function(target, targetselector){
			var me = this, res = me.checknode(target, targetselector);
			if(res){
				return target;
			}
			if(target.tagName.toUpperCase() === 'HTML'){
				return false;
			}else{
				return me.checkParentNode(target.parentNode, targetselector);
			}
		},
		bind: function(selector, _event, callback, targetselector){
			var me = this,
				selector = this.isString(selector)? this.$(selector): selector,
				_callback = callback;
			if(targetselector){
				_callback = function(e){

					var target = e.target, 
						currentTarget = me.checkParentNode(target, targetselector);
					if(currentTarget){
						e['currentTarget'] = currentTarget
						callback.call(currentTarget, e);
					}
				}
			}
			selector.addEventListener(_event, _callback)
		}

	}
}, typeof(UtilName) != 'undefined'? UtilName : '__');


