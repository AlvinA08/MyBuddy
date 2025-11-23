export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};


export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
};
