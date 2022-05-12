import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "test") {
    console.log("Express testing server listening on port " + PORT);
  } else {
    console.log("Express server listening on port " + PORT);
  }
});
