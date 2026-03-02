import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, mode } = req.body;

  const systemPrompt =
    mode === "unhinged"
      ? "You are Aria in chaotic meme mode. Use slang and humor but stay safe."
      : "You are Aria, a helpful AI assistant.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();

  res.json({
    reply: data.choices[0].message.content
  });
});

app.listen(3000, () => console.log("Aria server running"));
