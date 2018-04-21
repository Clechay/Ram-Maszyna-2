class Ribbon {
	data_sequence : number[];
	next_id : number;
	move() : void{}
	get_previous() : number[]{
		return [];
	}
	get_current() : number{
		return 0;
	}
	get_following() : number[]{
		return [];
	}
}
class InputRibbon extends Ribbon {
	read() : number{
		return 0;
	}
	readAndMove() : number{
		return 0;
	}
}

class OutputRibbon extends Ribbon{
	write() : void{}
	writeAndMove() : void{}
}