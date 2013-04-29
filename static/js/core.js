(function(app){
	app.core = (function(){
		var data = {}; //用来存储应用的组件
		
		return{
			define: function(id, constructor){
				data[id] = {define: constructor, instance: null};	
			},
			start: function(id){
				var module = data[id];
				module.instance = module.define(app.f.define(this, id));
				module.instance.init();
			},
			startAll: function(){
				var id;
				for(id in data){
					if(data.hasOwnProperty(id)){
						console.log('start ', id);
						this.start(id);
					}
				}
			},
			stop: function(){
				var modData;
				if(modData = data[id] && modData.instance){
					modData.instance.destroy();
					modData = null;
				}
			},
			events: {
				register: function(events, module){
					data[module].events = events;
				},
				trigger: function(events){
					var mod;
					for(mod in data){
						if(data.hasOwnProperty(mod)){
							mod = data[mod];
							if(mod.events && mod.events[events.type]){
								console.log('trigger', events.type);
								return mod.events[events.type](events.data);
							}
						}
					}
				},
				remove: function(events, module){
					if(module && module.events){
						delete module.events;
					}
				}
			},
			dom: {
				$: function(id){
					return document.getElementById(id);
				},
				bind: function(el, ev, fn){
				    if(el.addEventListener){
				        el.addEventListener(ev, fn, false);
				    }else if(el.attachEvent){
				        el.attachEvent('on' + ev, fn);
				    }else{
				        el[on + 'ev'] = fn;
				    }
				}
			}
		}	
	}());
}(app))