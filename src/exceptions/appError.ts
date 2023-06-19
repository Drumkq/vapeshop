interface BaseError {
    message: string,
    code: number
}

class AppError extends Error implements BaseError {
    code: number;
    message: string;

    constructor(message: string, code: number) {
        super(message);

        this.code = code;
        this.message = message;
    }
}