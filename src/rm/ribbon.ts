export class Ribbon {
    protected dataSequence: number[];
    protected nextId: number;

    protected constructor() {
        this.nextId = 0;
        this.dataSequence = [];
    }

    move(): void {
        this.nextId++;
    }

    getPrevious(): number[] {
        let result: number[] = [];
        for (let i = 0; i < this.nextId; i++) {
            result.push(this.dataSequence[i]);
        }
        return result;
    }

    getCurrent(): number {
        return this.dataSequence[this.nextId];
    }

    getFollowing(): number[] {
        let result: number[] = [];
        for (let i = this.nextId + 1; i < this.dataSequence.length; i++) {
            result.push(this.dataSequence[i]);
        }
        return result;
    }

    getEntire(): number[] {
        return Object.assign([], this.dataSequence);
    }
}

export class InputRibbon extends Ribbon {
    constructor(arr: number[]) {
        super();
        this.dataSequence = Object.assign([], arr);
    }

    read(): number {
        return this.dataSequence[this.nextId];
    }

    readAndMove(): number {
        this.nextId++;
        return this.dataSequence[this.nextId - 1];
    }
}

export class OutputRibbon extends Ribbon {
    constructor() {
        super();
        this.dataSequence = [];
    }

    write(val: number): void {
        this.dataSequence[this.nextId] = val;
    }

    writeAndMove(val: number): void {
        this.write(val);
        this.move();
    }
}