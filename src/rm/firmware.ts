// types of arguments
export enum DataTokenType {
    NUMBER,
    ADDRESS_TO_NUMBER,
    ADDRESS_TO_ADDRESS,
    LABEL,
    NULL
}

// argument class
export class DataToken {
    type: DataTokenType;
    value: string | number | null;

    static checks = {
        NUMBER: /^=\d+$/,
        ADDRESS_TO_NUMBER: /^\d+$/,
        ADDRESS_TO_ADDRESS: /^\^\d+$/,
        LABEL: /^\.([a-z])\w*$/,
    };

    constructor(raw: string) {
        this.value = raw;
        if (raw === '' || raw === null) {
            this.type = DataTokenType.NULL;
            this.value = null;
        }
        else if (DataToken.checks.NUMBER.test(raw)) {
            this.type = DataTokenType.NUMBER;
            this.value = Number(this.value.substring(1));
        }
        else if (DataToken.checks.ADDRESS_TO_ADDRESS.test(raw)) {
            this.type = DataTokenType.ADDRESS_TO_ADDRESS;
            this.value = Number(this.value.substring(1));
        }
        else if (DataToken.checks.ADDRESS_TO_NUMBER.test(raw)) {
            this.type = DataTokenType.ADDRESS_TO_NUMBER;
            this.value = Number(this.value);
        }
        else if (DataToken.checks.LABEL.test(raw)) {
            this.type = DataTokenType.LABEL;
            this.value = this.value.substring(1);
        }
        else throw 'unknown argument type';
    }
}

export class Command {
    raw: string;
    label: string | null;
    id: string;
    arg: DataToken;
    static checks = {
        valid: /(([a-z])+:\s)?([A-Z])+(\s(\.([a-z])+|(([\^=])?\d+)))?/,
        label: /^([a-z])+(?=\:)/g,
        id: /[A-Z]+/g,
        argument: /\.([a-z])+|(([\^=])?\d+)/g,
    };

    static validate_line(line: string): boolean {
        return Command.checks.valid.test(line);
    }

    constructor(raw: string) {
        if (!Command.validate_line(raw)) {
            this.raw = raw;
            this.label = null;
            this.id = 'NOP';
            this.arg = new DataToken(null);
            return;
        }
        // raw
        this.raw = raw;
        // label
        let label = raw.match(Command.checks.label);
        if (label !== null) this.label = label[0];
        else this.label = null;
        // id
        let id = raw.match(Command.checks.id);
        if (id !== null) this.id = id[0];
        else this.id = null;
        // arg
        let arg = raw.match(Command.checks.argument);
        if (arg !== null) this.arg = new DataToken(arg[0]);
        else this.arg = new DataToken(null);
    }
}

export class Firmware {
    map: Map<string, number>;
    commands: Command[];

    constructor(raw?: string) {
        // code
        let lines = raw.split('\n');
        this.commands = lines.map(value => new Command(value));
        if (this.commands[this.commands.length - 1].id !== 'HALT')
            this.commands.push(new Command('HALT'));
        // labels
        this.map = new Map<string, number>();
        this.commands.forEach((value, index) => {
            if (value.label != '') this.map.set(value.label, index);
        });
    }

    text(): string {
        return this.commands.reduce((acc: string, cur) => acc + '\n' + cur.raw, '').substring(1);
    }
}