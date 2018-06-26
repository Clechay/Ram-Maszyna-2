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
    value: string;

    private static checks = {
        NUMBER: /^=\d+$/,
        ADDRESS_TO_NUMBER: /^\d+$/,
        ADDRESS_TO_ADDRESS: /^\^\d+$/,
        LABEL: /^([a-z]|[A-Z])\w*$/,
    };

    constructor(raw: string) {
        this.value = raw;
        if (raw === '') this.type = DataTokenType.NULL;
        else if (DataToken.checks.NUMBER.test(raw)) this.type = DataTokenType.NUMBER;
        else if (DataToken.checks.ADDRESS_TO_ADDRESS.test(raw)) this.type = DataTokenType.ADDRESS_TO_ADDRESS;
        else if (DataToken.checks.ADDRESS_TO_NUMBER.test(raw)) this.type = DataTokenType.ADDRESS_TO_NUMBER;
        else if (DataToken.checks.ADDRESS_TO_ADDRESS.test(raw)) this.type = DataTokenType.ADDRESS_TO_ADDRESS;
        else throw 'unknown argument type';
    }
}

export class Command {
    raw: string;
    commandId: string;
    arg: DataToken;
    label:string;
    static checks = {
        label : /([a-z])+(?=:)/,
        valid : /(([a-z])+:\s)?([A-Z])+(\s(\.([a-z])+|(([\^=])?\d+)))?/,
        id : /[A-Z]+/,
        argument : /\.([a-z])+|(([\^=])?\d+)/,
    };
    static validate_line(line:string):boolean{
        return Command.checks.valid.test(line);
    }
    constructor(raw:string){
        this.raw = raw;
        let labels = raw.match(Command.checks.label);
        // console.log(raw);
        if(labels !== null) this.label = raw.match(Command.checks.label)[0];
        else this.label = "";
    //     this.commandId = raw.match(Command.checks.id)
    // }
}

export class Firmware {
    map: Map<string, number>;
    commands: Command[];
    parse(raw:string){
        // console.log("parsing: "+raw);
        let lines = raw.split("\n");
        // console.log(lines)
        // lines = lines.filter(value => {Command.validate_line(value)});
        // console.log(lines)
        this.commands = lines.map(value => new Command(value));
        this.commands.forEach((value, index) => {
            if(value.label != "") this.map.set(value.label,index);
        });
    }
    constructor(src? :string){
        this.map = new Map<string, number>();
        if(typeof src === typeof undefined){
            src = "HALT";
        }
        this.parse(src);
    }
}