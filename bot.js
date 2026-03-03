const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'lafxjy.aternos.me',
  port: 25732,
  username: 'AFKBot',
  version: '1.21.11'
})

bot.on('spawn', function() {
  console.log('Bot joined the server!')
  setInterval(function() {
    bot.setControlState('jump', true)
    setTimeout(function() {
      bot.setControlState('jump', false)
    }, 500)
  }, 30000)
})

bot.on('kicked', function(reason) {
  console.log('Bot was kicked:', reason)
})

bot.on('error', function(err) {
  console.log('Error:', err)
})