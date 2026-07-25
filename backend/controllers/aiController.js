const groq = require("../config/ai");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const prompt = `
You are an AI shopping assistant for an ecommerce website.

Help users with:
- product suggestions
- product comparisons
- shopping advice
- basic ecommerce questions

Keep answers short, helpful, and customer friendly.

User message:
${message}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful ecommerce shopping assistant.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      model: "llama-3.1-8b-instant",

      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({
      reply: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI service failed",
    });
  }
};

module.exports = {
  chatWithAI,
};
