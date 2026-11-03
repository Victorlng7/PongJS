export class Key {
    public key: KeyboardEvent | null;

    constructor() {
        this.key = null;
    }

    setKey(k: KeyboardEvent) {
        this.key = k;
    }
    deletKey() {
        this.key = null;
    }
}
