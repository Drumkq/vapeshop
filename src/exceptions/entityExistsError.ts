class EntityExistsError extends AppError {
    constructor() {
        super('This entity already exists', 409);
    }
}