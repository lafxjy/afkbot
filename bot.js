const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'lafxjy.aternos.me',
    port: 25732,
    username: 'AFKBot',
    version: '1.21.1'
  })

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
    setTimeout(createBot, 10000)
  })

  bot.on('error', function(err) {
    console.log('Error:', err)
    setTimeout(createBot, 10000)
  })

  bot.on('end', function() {
    console.log('Disconnected, reconnecting...')
    setTimeout(createBot, 10000)
  })
}

// Wait 10 seconds before first connect
setTimeout(createBot, 10000)
