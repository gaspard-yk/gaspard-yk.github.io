 const { Telegraf, Markup } = require('telegraf');
 const keyboard = Markup.inlineKeyboard([
   Markup.button.webApp('test web app', 'https://gaspard-yk.github.io'),
 ]);
 const urlbutton = Markup.keyboard([
  Markup.button.webApp('test web app', 'https://gaspard-yk.github.io')
 ])

 const bot = new Telegraf('5444045893:AAEFNihtjBIK90frln1y3JPDRZvp1BehKwY'); //сюда помещается токен, который дал botFather
 bot.hears('hi', (ctx) => ctx.reply('Hey there'));// bot.hears это обработчик конкретного текста, данном случае это - "hi"
 bot.hears('test', (ctx) => ctx.reply('my test',urlbutton));
 bot.on('web_app_data',(ctx)=>{

  ctx.reply(ctx.message.web_app_data.data);
 })
 bot.launch(); // запуск бота
