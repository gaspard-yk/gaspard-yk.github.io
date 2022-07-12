 const { Telegraf, Markup } = require('telegraf');
 const keyboard = Markup.inlineKeyboard([
   Markup.button.webApp('❤️', 'https://gaspard-yk.github.io'),
 ]);

 const bot = new Telegraf('5444045893:AAEFNihtjBIK90frln1y3JPDRZvp1BehKwY'); //сюда помещается токен, который дал botFather
 bot.on('message', (ctx) => ctx.reply('my test', keyboard))
 bot.hears('hi', (ctx) => ctx.reply('Hey there'));// bot.hears это обработчик конкретного текста, данном случае это - "hi"
 bot.launch(); // запуск бота
