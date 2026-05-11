import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY"
});

app.post("/generate", async (req, res) => {
  const { username, reason, story } = req.body;

  const prompt = `
Write a polite and professional Roblox ban appeal.

Username: ${username}
Ban Reason: ${reason}
User Explanation: ${story}

Make it respectful, short, and convincing.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({ text: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running"));