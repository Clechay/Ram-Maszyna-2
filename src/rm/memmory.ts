export class Memmory {
    cells: number[];

    set(id: number, value: number): void {
        this.cells[id] = value;
    }

    get(id: number): number {
        if (typeof this.cells[id] === typeof undefined) {
            throw 'getting from unused memmory';
        }
        return this.cells[id];
    }

    getAll(): number[] {
        return Object.assign([], this.cells);
    }
}