const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const answers = {
  date: "3009",
  memory: "bike",
  nickname: "kunjuuuu"
};

app.post("/api/verify", (req,res) => {
  const { step, answer } = req.body;
  let ok = false;
  if(step === 1) ok = String(answer).replace(/[^0-9]/g,"") === answers.date;
  if(step === 2) ok = String(answer).toLowerCase() === answers.memory;
  if(step === 3) ok = String(answer).toLowerCase().replace(/\s/g,"") === answers.nickname;
  res.json({ ok });
});

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(PORT, () => console.log(`Anniversary website running at http://localhost:${PORT}`));
