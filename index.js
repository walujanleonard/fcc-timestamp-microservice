const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date_string?", (req, res) => {
  let { date_string } = req.params;
  let date;
  if (!date_string) {
    date = new Date();
  } else {
    date_string = /^\d+$/.test(date_string) ? Number(date_string) : date_string;
    date = new Date(date_string);
    if (Number.isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
