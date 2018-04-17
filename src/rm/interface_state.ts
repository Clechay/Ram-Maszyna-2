interface State {
	a: number;
	b: string;
}
class BasicState implements State{
	a :number;
	b: string;
	c: JSX.Element;
}
class Engine{
	s: State;
	constructor(state: State){
		this.s = state;
	}
}