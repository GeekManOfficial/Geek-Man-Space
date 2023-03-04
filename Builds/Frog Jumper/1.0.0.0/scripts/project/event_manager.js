export default class EventManager
{
	#eventHandlersMap = new Map();
	#eventHandlersArray = [];
	
	constructor()
	{
		
	}
	
	append(obj, eventName, handler, tag=null)
	{
		const saveObject = {obj, eventName, handler};
		
		if (tag !== null) this.#eventHandlersMap.set(tag, saveObject);
		else this.#eventHandlersArray.push(saveObject);
		
		obj.addEventListener(eventName, handler);
	}
	
	release(tag=null)
	{
		tag !== null ? this.#release_tag(tag) : this.#release_all();
	}
	
	#release_tag(tag)
	{
		const current = this.#eventHandlersMap.get(tag);
		
		if (current === undefined)
		{
			console.warn(`[EventManager]: missing tag`, tag);
			return;
		}
		
		const {obj, eventName, handler} = current;
		
		obj.removeEventListener(eventName, handler);
	}
	
	#release_all()
	{
		this.#release_map();
		
		this.#release_array();
	}
	
	#release_map()
	{
		const eventHandlersMap = this.#eventHandlersMap;
		for (const key of eventHandlersMap.keys())
		{
			this.#release_tag(key);
		}
		this.#eventHandlersMap.clear();
	}
	
	#release_array()
	{
		const eventHandlersArray = this.#eventHandlersArray;
		for (let i = eventHandlersArray.length - 1; i >= 0; i--)
		{
			const {obj, eventName, handler} = eventHandlersArray[i];
			
			obj.removeEventListener(eventName, handler);
		}
		eventHandlersArray.length = 0;
	}
}