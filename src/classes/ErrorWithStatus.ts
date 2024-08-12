export class ErrorWithStatus extends Error {
    public code?: string | number;
    constructor(msg: string, code?: number) {
        super(msg);
        Object.setPrototypeOf(this, ErrorWithStatus.prototype);
        this.code = code;
    }

    description() {
        if (this.code) {
            return "Error: " + this.message + "Status Code: " + this.code;
        }
        return "Error: " + this.message;
    }
}
