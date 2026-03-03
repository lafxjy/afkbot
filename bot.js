const mineflayer = require('mineflayer')

let botInstance = null
let reconnectTimeout = null

function createBot() {
  if (botInstance) {
    botInstance.end()
    botInstance = null
  }

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout)
    reconnectTimeout = null
  }

  const bot = mineflayer.createBot({
    host: 'lafxjy.aternos.me',
    port: 25732,
    username: 'AFKBot',
    version: '1.21.11'
  })

  botInstance = bot

  bot.on('spawn', function() {
    console.log('Bot joined!')
    setTimeout(function() {
      bot.chat('/gamemode spectator')
    }, 3000)
    setInterval(function() {
      bot.setControlState('jump', true)
      setTimeout(function() {
        bot.setControlState('jump', false)
      }, 500)
    }, 30000)
  })

  bot.on('kicked', function(reason) {
    console.log('Kicked:', reason)
    botInstance = null
    reconnectTimeout = setTimeout(createBot, 15000)
  })

  bot.on('error', function(err) {
    console.log('Error:', err)
    botInstance = null
    reconnectTimeout = setTimeout(createBot, 15000)
  })

  bot.on('end', function() {
    console.log('Disconnected, reconnecting...')
    botInstance = null
    reconnectTimeout = setTimeout(createBot, 15000)
  })
}

setTimeout(createBot, 10000)
