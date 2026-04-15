import "dotenv/config";
import { Bot, InlineKeyboard } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN){
    throw new Error("Токен не найден. Проверь файл .env");
}

const bot = new Bot(BOT_TOKEN);

const userOrders: Record<number, string> = {};

const ORDER_NAMES: Record<string, string> = {
    "pizza": "Пицца",
    "sushi": "Суши",
    "default": "Неизвестное блюдо"
};

console.log("Бот запущен");

bot.command("start", (ctx) => {
    const userName = ctx.from.first_name ?? "Друг";

    ctx.reply(`Привет, ${userName}! Рад тебя видеть.\nНапиши /menu, чтобы узнать команды.`);
});

bot.command("menu", async (ctx) => {
    const keyboard = new InlineKeyboard()
        .text("Пицца", "pizza")
        .text("Суши", "sushi")
        .row()
        .url("Яндекс", "https://ya.ru");

    await ctx.reply("Что будем заказывать?", {
        reply_markup: keyboard
    });
});

bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;

    const userId = ctx.from.id;

    userOrders[userId] = data;

    if (data === "pizza"){
        await ctx.answerCallbackQuery("Отличный выбор");
        await ctx.editMessageText("Вы заказали пиццу!");
    } else if (data === "sushi") {
        await ctx.answerCallbackQuery("Японская кухня!");
        await ctx.editMessageText("Вы заказали суши!");
    }
});

bot.command("check", (ctx) => {
    const userId = ctx.from.id;
    const orderId = userOrders[userId];

    if (orderId) {
        const niceName = ORDER_NAMES[orderId] ?? ORDER_NAMES["default"];
        ctx.reply(`Твой последний заказ: ${niceName}`);
    } else {
        ctx.reply("Ты ещё ничего не заказывал");
    }
});

console.log("Бот готов к работе");
bot.start();