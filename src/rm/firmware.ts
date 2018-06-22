export enum DataTokenType {
    NUMBER,
    ADDRESS_TO_NUMBER,
    ADDRESS_TO_ADDRESS,
    LABEL,
    NULL
}

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
    commandId: string;
    arg: DataToken;
    label:string;
    static checks = {
        label : /([a-z])+(?=:)/,
        valid : /(([a-z])+:\s)?([A-Z])+(\s(\.([a-z])+|(([\^=])?\d+)))?/
    };
    static validate_line(line:string):boolean{
        return Command.checks.valid.test(line);
    }
    constructor(raw:string){
        let labels = raw.match(Command.checks.label);
        if(labels.length > 0) this.label = raw.match(Command.checks.label)[0];
        else this.label = "";
        
    }
}

export class Firmware {
    map: Map<string, number>;
    commands: Command[];
    parse(raw:string){
        let lines = raw.split("\n");
        this.commands = lines.filter(value => {Command.validate_line(value)}).map(value => new Command(value));
        this.commands.forEach((value, index) => {
            if(value.label != "") this.map.set(value.label,index);
        });
    }
    constructor(){
        this.map = new Map<string, number>();
    }
}