const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

const MENU = {
  inline_keyboard: [
    [{ text: "Портфолио", callback_data: "portfolio" }],
    [{ text: "Моя история", callback_data: "story" }],
    [{ text: "Мои цели", callback_data: "goals" }],
    [{ text: "Достижения", callback_data: "achievements" }],
    [{ text: "Группы и каналы", callback_data: "channels" }],
    [{ text: "Что делал / делаю", callback_data: "work" }],
  ],
};

const TEXTS = {
  portfolio:
    "Портфолио\n\n• Проект 1 — ссылка\n• Проект 2 — ссылка\n• GitHub: https://github.com/leffstroi",
  story: "Моя история\n\nКто я, откуда, чем занимаюсь. Замени этот текст.",
  goals: "Мои цели\n\n1. ...\n2. ...\n3. ...",
  achievements: "Достижения\n\n• ...\n• ...",
  channels:
    "Группы и каналы\n\n• Канал — https://t.me/...\n• Группа — https://t.me/...",
  work: "Что делал и делаю\n\nСделано:\n• ...\n\nСейчас:\n• ...",
};

async function tg(method, body) {
  await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "ok" };
  }

  const update = JSON.parse(event.body || "{}");

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = (update.message.text || "").trim();
    if (text === "/start" || text === "/menu") {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Выбери раздел:",
        reply_markup: MENU,
      });
    } else {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Напиши /start",
        reply_markup: MENU,
      });
    }
  }

  if (update.callback_query) {
    const q = update.callback_query;
    const key = q.data;
    await tg("answerCallbackQuery", { callback_query_id: q.id });
    await tg("editMessageText", {
      chat_id: q.message.chat.id,
      message_id: q.message.message_id,
      text: TEXTS[key] || "Раздел пуст.",
      reply_markup: MENU,
      disable_web_page_preview: true,
    });
  }

  return { statusCode: 200, body: "ok" };
};
