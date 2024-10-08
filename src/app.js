const { app, path, express } = require("./server");
const authorizeFeedsAccess = require("./authFeedsMiddleware");
app.use(
  "/feeds",
  authorizeFeedsAccess,
  express.static(path.join(__dirname, "../feeds"))
);
const PORT = process.env.PORT || 3500;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
