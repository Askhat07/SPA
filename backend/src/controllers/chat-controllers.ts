// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered or Token malfunctioned" });
//     // grab chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });
//     // send all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-4o-mini",
//       messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const sendChatsToUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   //user token check
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered or Token malfunctioned");
//     }

//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     return res.status(200).json({ message: "OK", chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// export const deleteChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     //user token check
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     //@ts-ignore
//     user.chats = [];
//     await user.save();
//     return res.status(200).json({ message: "OK" });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// // Функция для получения темы вопроса (только для математики)
// async function getQuestionTopic(message: string): Promise<string> {
//   const config = configureOpenAI();
//   const openai = new OpenAIApi(config);

//   try {
//     // Отправляем запрос в OpenAI API для определения темы
//     const response = await openai.createChatCompletion({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content:
//             "Определите, относится ли этот вопрос к математике. Ответьте только 'математика' или 'не математика'.",
//         },
//         { role: "user", content: message },
//       ],
//     });

//     // Получаем ответ с темой вопроса
//     const topic = response.data.choices[0].message.content.trim().toLowerCase();
//     return topic;
//   } catch (error) {
//     console.error("Ошибка при получении темы:", error);
//     throw new Error("Не удалось определить тему вопроса");
//   }
// }

// // Генерация ответа и проверка темы (только математика)
// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered or Token malfunctioned" });

//     // Получаем тему вопроса
//     const topic = await getQuestionTopic(message);

//     // Проверяем, является ли тема вопроса "математика"
//     if (topic !== "математика") {
//       return res.status(403).json({
//         message:
//           "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике.",
//       });
//     }

//     // Сохраняем сообщение в историю чатов пользователя
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });

//     // Отправляем все чаты с новым в OpenAI API
//     const openai = new OpenAIApi(configureOpenAI());
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-4",
//       messages: chats,
//     });

//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Что-то пошло не так" });
//   }
// };

// // Отправка всех чатов пользователю
// export const sendChatsToUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered or Token malfunctioned");
//     }

//     return res.status(200).json({ message: "OK", chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// // Удаление всех чатов
// export const deleteChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     // @ts-ignore
//     user.chats = [];
//     await user.save();
//     return res.status(200).json({ message: "OK" });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// Проект для ОИИ
// chat-controllers.ts
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

async function getQuestionTopic(message: string): Promise<string> {
  const config = configureOpenAI();
  const openai = new OpenAIApi(config);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Определите, относится ли этот вопрос к математике. Ответьте только 'математика' или 'не математика'.",
        },
        { role: "user", content: message },
      ],
    });

    const topic = response.data.choices[0].message.content.trim().toLowerCase();
    return topic;
  } catch (error) {
    console.error("Ошибка при получении темы:", error);
    throw new Error("Не удалось определить тему вопроса");
  }
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });

    const topic = await getQuestionTopic(message);

    if (topic !== "математика") {
      return res.status(403).json({
        message:
          "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике.",
      });
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const openai = new OpenAIApi(configureOpenAI());
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token malfunctioned");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    // @ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
