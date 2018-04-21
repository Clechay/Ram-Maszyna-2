interface TerminationRule {
	check(state : State, firmware : Firmware) : boolean;
}
interface Terminator {
	check(state : State, firmware : Firmware) : boolean;
	rules :TerminationRule[];
}