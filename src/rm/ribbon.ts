import { error } from 'util';

export class Ribbon {
    dataSequence: number[];
    nextId: number;

    move(): void {
        error('not implemented');
    }

    getPrevious(): number[] {
        return [];
    }

    getCurrent(): number {
        return 0;
    }

    getFollowing(): number[] {
        return [];
    }
}

export class InputRibbon extends Ribbon {
    read(): number {
        return 0;
    }

    readAndMove(): number {
        return 0;
    }
}

export class OutputRibbon extends Ribbon {
    write(): void {
        error('not implemented');
    }

    writeAndMove(): void {
        error('not implemented');
    }
}