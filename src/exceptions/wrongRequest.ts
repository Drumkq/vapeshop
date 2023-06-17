export class WrongRequest extends Error {
    constructor() {
        super(`Error: wrong request`);
    }
}
