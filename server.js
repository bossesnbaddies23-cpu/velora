import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.json());
app.use(express.static("public"));

// 🔥 FORCE index.html to load
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: req.body.messages,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
