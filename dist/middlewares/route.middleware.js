export const generateMiddleware = (schema) => {
    return (req, res, next) => {
        if (schema) {
            const result = schema.validate(req.body);
            if (result.error) {
                return res
                    .status(400)
                    .json({ message: "Validation Error", errors: result.error });
            }
        }
        next();
    };
};
//# sourceMappingURL=route.middleware.js.map