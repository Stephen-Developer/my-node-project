export class HttpError extends Error{
    status: number;

    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = HttpError.name; // stack traces display correctly now
    }
}

export function isHttpError(error: unknown): error is HttpError {
    return (
        typeof error === "object" 
        && error !== null 
        && "message" in error 
        && typeof (error as any).message === "string" 
        && "status" in error 
        && typeof (error as any).status === "number"
    );
}

export const BadRequest = (msg = "Bad request") => new HttpError(msg, 400);
export const Unauthorized = (msg = "Unauthorized") => new HttpError(msg, 401);
export const NotFound = (msg = "Not found") => new HttpError(msg, 404);
export const InternalServerError = (msg = "Internal server error") => new HttpError(msg, 500);
