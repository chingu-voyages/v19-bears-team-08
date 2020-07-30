const createError = require("http-errors");
const authRoutes = require("./auth");
const emailRoutes = require("./emails");
const openProjectsRoutes = require("./open-projects");

module.exports = app => {
  app.use("/api/user", authRoutes);
  app.use("/api/templates", emailRoutes);
  app.use("/api/projects", openProjectsRoutes);

  //catches all endpoints that don't exist above
  app.use((req, res, next) =>
    next(createError(404, `Invalid URL: ${req.url}`))
  );

  //catches all errors passed through next()
  app.use((err, req, res, next) => {
    const status = err.status || 400;
    const message = err.message || "Unknown Error";
    res.status(status).json({ message });
  });
};
