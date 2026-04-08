import { validationResult } from "express-validator";

const notFoundHandler = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   error.status = 404;
   next(error);
}

const errorHandler = (err, req, res, next) => {
   console.log('Error status:', err.status);
   res.status(err.status  || 500);
   res.json({
      error: {
         message: err.message,
         status: err.status  || 500
      }
   });
}

const validationErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const message = errors
         .array()
         .map((error) => `${error.path}: ${error.msg}`)
         .join(', ');
      const error = new Error(`Validation error: ${message}`);
      error.status = 400;
      return next(error);
   }
   next();
}

export { notFoundHandler, errorHandler, validationErrors };
