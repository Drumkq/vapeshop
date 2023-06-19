class InvalidBodyError extends AppError {
    constructor(inputBody?: object) {
        super(`Invalid body in request\n${inputBody}`, 422);
    }
}