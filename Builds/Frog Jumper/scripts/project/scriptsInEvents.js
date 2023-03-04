import Springs from "./springs.js";
import BoxWithTick from "./box_with_tick.js";


const scriptsInEvents = {

	async ["E-Game_Event10"](runtime, localVars)
	{
		const platform = runtime.objects.Lily.getFirstPickedInstance();
		const boxWithTick = new BoxWithTick();
		const springs = new Springs(runtime, 0, 0, 0, 4, 0.8);
		
		platform.springs = springs.append(platform);
		boxWithTick.append(platform, () => {
		platform.y = 600 + platform.springs.get_position();
		});
	},

	async ["E-Game_Event26"](runtime, localVars)
	{
		const platform = runtime.objects.Lily.getFirstPickedInstance();
		platform.springs.set_velocity(runtime.objects.Player.getFirstInstance().behaviors.Platform.jumpStrength / 45);
	},

	async ["E-Game_Event35"](runtime, localVars)
	{
		const platform = runtime.objects.Lily.getFirstPickedInstance();
		platform.springs.set_velocity(runtime.objects.Player.getFirstInstance().behaviors.Platform.jumpStrength / 45);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

