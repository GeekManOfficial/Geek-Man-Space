export default class BoxWithTick
{
	constructor(runtime=null, b_addEventListenerTick=false)
	{
		this.instances = new Map();
		this.b_listener = false;
		
		this.tick = () => {
			for (const instance of this.instances.values())
			{
				const callbacks = instance.callbacks;
				for (let i = 0; i < callbacks.length; i++)
				{
					const callback = callbacks[i];
					callback();
				}
			}
		};
		
		if (b_addEventListenerTick) this._add_event_listener(runtime);
	}
	
	append(instance, callback)
	{
		const runtime = instance.runtime;
		const instances = this.instances;
		
		if (instance.callbacks === undefined) instance.callbacks = [];
		instance.callbacks.push(callback);
		instances.set(instance.uid, instance);
		
		this._add_event_listener(runtime);
		
		instance.addEventListener("destroy", () => {
			instances.delete(instance.uid);
			
			if (instances.size > 0) return;
			
			this._remove_event_listener(runtime);
		});
	}
	
	_add_event_listener(runtime)
	{
		if (this.b_listener) return;
		
		this.b_listener = true;
		runtime.addEventListener("tick", this.tick);
	}
	
	_remove_event_listener(runtime)
	{
		this.b_listener = false;
		runtime.removeEventListener("tick", this.tick);
	}
}