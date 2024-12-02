// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
async function getQuestionTopic(message) {
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "Определите, относится ли этот вопрос к математике. Ответьте только 'математика' или 'не математика'.",
                },
                { role: "user", content: message },
            ],
        });
        const topic = response.data.choices[0].message.content.trim().toLowerCase();
        return topic;
    }
    catch (error) {
        console.error("Ошибка при получении темы:", error);
        throw new Error("Не удалось определить тему вопроса");
    }
}
export const generateChatCompletion = async (req, res, next) => {
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
                message: "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике.",
            });
        }
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Что-то пошло не так" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map