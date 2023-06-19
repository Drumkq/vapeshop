class EntityNotFoundError extends AppError {
    constructor() {
        super('Entity not found', 404);
    }
}