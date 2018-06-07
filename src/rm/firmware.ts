export enum DataTokenType {
    NUMBER,
    ADDRESS_TO_NUMBER,
    ADDRESS_TO_ADDRESS,
    LABEL
}

export class DataToken {
    type: DataTokenType;
    value: string;
}

export class Command {
    commandId: string;
    arg: DataToken;
}

export class Firmware {
    map: Map<string, number>;
    commands: Command[];
}