# Портфолио-бот

Тексты разделов — в `netlify/functions/bot.js`, объект `TEXTS`.

## Деплой

1. Netlify → Add new site → Import an existing project → этот репозиторий.
2. Site settings → Environment variables → `BOT_TOKEN` = токен из BotFather.
3. Webhook:

```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<SITE>.netlify.app/.netlify/functions/bot
```

4. В боте напиши `/start`.
