export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  res.on("finish", () => {
    console.log(`[${timestamp}] ${method} ${url} -- ${res.statusCode}`);
  });

  next();
};
