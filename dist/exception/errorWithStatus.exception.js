export class ErrorWithStatus extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
//# sourceMappingURL=errorWithStatus.exception.js.map