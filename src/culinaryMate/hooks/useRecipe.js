// useRecipe.js
import { useState } from "react";
import axios from "axios";

export const useRecipe = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  const handleSendMessage = async (message) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const model = process.env.REACT_APP_OPENAI_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_API_URL;

    const requestBody = {
      model: model,
      messages: [
        {
          role: "system",
          content:
            "あなたは親切で知識豊富なアシスタントです。解答は、献立に関する提案をお願いします。",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const content = response.data.choices[0].message.content;
      setResponse(content);
      setError(null);
    } catch (error) {
      console.error("APIリクエストが失敗しました:", error);
      setError("APIリクエストが失敗しました。もう一度お試しください。");
    }
  };

  return { response, error, handleSendMessage };
};
