class DataToken {
	type : string;
	value : number;
}

class Command {
	command_id : string;
	args : DataToken[];
}

class Firmware{
	map : Map<string, number>;
	commands : Command[];
}