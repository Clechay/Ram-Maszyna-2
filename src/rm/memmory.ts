class Memmory{
	cells : number[];
	set(id : number, value : number) : void{
		this.cells[id] = value;
	}
	get(id : number) : number {
		if (typeof this.cells[id] === typeof undefined) {
			throw "getting from unused memmory";
		}
		return this.cells[id];
	}
	get_all() : number[]{
		let temp = Object.assign([], this.cells);
		return temp;
	}
}