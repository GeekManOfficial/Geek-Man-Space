import Springs from "./springs.js";
import BoxWithTick from "./box_with_tick.js";


const scriptsInEvents = {

	async ["E-Game_Event5"](runtime, localVars)
	{
		const platform = runtime.objects.lily.getFirstPickedInstance();
		const boxWithTick = new BoxWithTick();
		const springs = new Springs(runtime, 0, 0, 0, 4, 0.8);
		
		platform.springs = springs.append(platform);
		boxWithTick.append(platform, () => {
		platform.y = 610 + platform.springs.get_position();
		});
	},

	async ["E-Game_Event9"](runtime, localVars)
	{
		const platform = runtime.objects.lily.getFirstPickedInstance();
		platform.springs.set_velocity(runtime.objects.player.getFirstInstance().instVars.jumpStrength / 45);
	},

	async ["E-Game_Event15"](runtime, localVars)
	{
		const platform = runtime.objects.lily.getFirstPickedInstance();
		platform.springs.set_velocity(runtime.objects.player.getFirstInstance().instVars.jumpStrength / 40);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

