(function(app){
	app.f = {
		define: function(core, module){
			var core = app.core,
				dom = core.dom,
				events = core.events

			return {
				publish: function(e){
					events.trigger(e);
				},
				subscribe: function(e){
					events.register(e, module);
				},
				ignore: function(e){
					events.remove(e, module);
				},
				$: function(id){
					return dom.$(id);
				},
				bind: function(el, ev, fn){
					dom.bind(el, ev, fn);
				}
			}
		}
	}
}(app))