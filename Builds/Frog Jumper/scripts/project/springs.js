import EventManager from "./event_manager.js";

export default class Springs
{
	#runtime;
	#position;
	#velocity;
	#goalPosition;
	#frequency;
	#damping;
	
	#eventManager;
	
	constructor(runtime, position, velocity, goalPosition, frequency, damping)
	{
		this.#runtime = runtime;
		this.#position = position;
		this.#velocity = velocity;
		this.#goalPosition = goalPosition;
		this.#frequency = frequency;
		this.#damping = damping;
		
		const eventManager = new EventManager();
		this.#eventManager = eventManager;
		eventManager.append(runtime, "tick", () => this.#on_tick());
	}
	
	set_position(position)
	{
		this.#position = position;
	}
	
	offset_position(position)
	{
		this.#position += position;
	}
	
	get_position()
	{
		return this.#position;
	}
	
	set_velocity(velocity)
	{
		this.#velocity = velocity;
	}
	
	offset_velocity(velocity)
	{
		this.#velocity += velocity;
	}
	
	set_goal_position(goalPosition)
	{
		this.#goalPosition = goalPosition;
	}
	
	offset_goal_position(goalPosition)
	{
		this.#goalPosition += goalPosition;
	}
	
	append(instance)
	{
		instance.addEventListener("destroy", () => this.#eventManager.release());
		return this;
	}
	
	#on_tick()
	{
		this.#velocity = calc_damped_simple_harmonic_motion(
			this.#position,
			this.#velocity,
			this.#goalPosition,
			this.#runtime.dt,
			this.#frequency,
			this.#damping,
		);
		this.#position += this.#velocity;
	}
}

function springing(velocity, a, b, dampeningRatio, speed)
{
	//dampeningRatio set between ( 0 - 1 ) || 0 = acts similar to lerp || 1 = will keep bounce back and forth forever
	
	//Apply Dampening
	let resultVelocity = velocity * dampeningRatio;
	
	//Set Velocity
	resultVelocity += (b - a) * speed;
	
	return resultVelocity;
}

function calc_damped_simple_harmonic_motion
(
	position,				//"Live" position value
	velocity,				//"Live" velocity value
	equilibriumPosition, 	//Goal / rest position
	deltaTime,				//Time to update over
	angularFrequency,		//Angular frequency of motion
	dampingRatio,			//Damping ration of motion
	/*
	Первые два - положение и скорость - отслеживают состояние пружины. Поскольку они используют ключевое слово "ref", мы ожидаем, что код Spring внесёт изменения в эти значения. После вызова кода пружины мы можем использовать эти значения как есть - функция будет поддерживать актуальность положения и скорости.
	
	Затем у нас есть положение равновесия, которое является целевым положением пружины.
	
	Дельта-время - это, ну, дельта-время - мы передаём его, чтобы Spring мог выполнить необходимые математические операции.
	
	Нас больше всего интересуют последние два значения - демпфирование и частота. Эти два значения определяют поведение пружины.
	
	Демпфирование определяет, насколько "пружинистым" должно быть движение. Когда демпфирование равно 1, не будет промаха или отскока - объект приземлится точно в исходное положение. Когда демпфирование равно 0, пружина будет бесконечно подпрыгивать - объект никогда не остановится.

	Частота определяет, насколько "сильным" будет движение. Низкая частота означает, что пружина менее реактивна при внесении изменений. Высокая частота приведёт к тому, что пружина взорвётся при малейшем изменении.
	*/
)
{
	let resultVelocity = velocity * dampingRatio;
	
	resultVelocity += (equilibriumPosition - position) * angularFrequency * deltaTime;
	
	return resultVelocity;
}