import { ResponseError } from "../error/response-error.js";

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: [{ message: err.message }]
        });
    } else {
        res.status(500).json({
            errors: [{ message: err.message || "Internal Server Error" }]
        });
    }
};

export { errorMiddleware };
