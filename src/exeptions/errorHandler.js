export class ErrorHandler extends Error {
    constructor(message, status = 500) {
        this.message = message,
        this.status = status
    }
}