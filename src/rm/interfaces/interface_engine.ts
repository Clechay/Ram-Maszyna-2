interface Engine {
	step( prev : State, firmware : Firmware) : State;
	execute( prev : State, firmware : Firmware) : State;
	debug( prev : State, firmware : Firmware, term : Terminator) : State;
}