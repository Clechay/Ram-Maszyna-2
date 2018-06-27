export class Action {
    id: string;
    payload: object;

    constructor(id: string, payload?: object) {
        this.id = id;
        this.payload = payload;
    }
}