class Ribbon {
	private list: number[];
	private counter: number;
	constructor(array: number) {
		this.list = Object.assign([], array);
		this.counter = 0;
	}
	/**
	 * get_list
	 */
	public get_list():number[]{
		let temp = Object.assign([], this.list);
		return temp;
	}
	/**
	 * get_counter
	 */
	public get_counter():number{
		return this.counter;
	}
	/**
	 * get_next
	 */
	public get_next():number{
		return this.list [this.counter];
	}
	/**
	 * take
	 */
	public take():number{
		this.counter--;
		return this.list[this.counter - 1];
	}
	/**
	 * push
	 */
	public push():number{
		this.counter++;
		return this.list[this.counter - 1];
	}
}