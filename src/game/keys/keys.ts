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

    isPressed(k: string): boolean {
        if (this.key) {
            if (this.key.code === k) {
                return true;
            }
        }
        return false;
    }
}
