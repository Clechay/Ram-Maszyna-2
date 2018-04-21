interface Executable{
	state : State;
	engine : Engine;
	firmware : Firmware;
	execute() : void;
	step() : void;
	debug(term : Terminator) : void;
}