import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 20, // Limit each IP to 20 requests per `window` (here, per 1 minutes).
  keyGenerator: function (req) {
    return req.headers["x-device-id"] || req.ip;
  },
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
});

// export const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 20 minutes
//   max: 5, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
//   standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header.
//   legacyHeaders: false,
// });
