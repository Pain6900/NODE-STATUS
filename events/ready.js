const { Client, EmbedBuilder } = require("discord.js")
const { logs } = require("../config.js")


module.exports = async (client) => {

  client.manager.init(client.user.id)
  console.log(`${client.user.username} online!`)

  const channel = await client.channels.fetch(logs)

  try{
  await channel.bulkDelete(10)
  }catch(e){}
    
  const embed = new EmbedBuilder()
    .setColor("#61DC55")
    .setDescription("Please wait for a minute!\nStats is being fetched.")

  await channel.send({ embeds: [embed] }).then((msg) => {
    setInterval(async () => {

      let x = client.manager.nodes.map((node) =>

        `${node.connected ? `${
          `${`\`\`\`js\n` +

        `✅ Node : ${node.options.identifier}\n` +

        `──────────────────────────────────────\n` +

        `🧩URL : ${node.options.host}\n` +

        `──────────────────────────────────────\n` +

        `🧩Memory\n` +
        `ㅤㅤ🍥 Free: ${formatBytes(node.stats.memory.free)}\n` +
        `ㅤㅤ🍥 Used: ${formatBytes(node.stats.memory.used)}\n` +
        `ㅤㅤ🍥 Allocated: ${formatBytes(node.stats.memory.allocated)}\n` +
        `ㅤㅤ🍥 Reservable: ${formatBytes(node.stats.memory.reservable)}\n` +

        `──────────────────────────────────────\n` +

        `🧩Processor\n` +
        `ㅤㅤ🍥 Cores: ${node.stats.cpu.cores} Cores\n` +
        `ㅤㅤ🍥 System Load: ${node.stats.cpu.systemLoad.toFixed(5)} %\n` +
        `ㅤㅤ🍥 Lavalink Load: ${node.stats.cpu.lavalinkLoad.toFixed(5)} %\n` +

        `──────────────────────────────────────\n` +

        `🧩Connections\n` +
        `ㅤㅤ🍥 Connected : ${node.stats.players} Players\n` +
        `ㅤㅤ🍥 Now Playing : ${node.stats.playingPlayers} Players\n` +

        `──────────────────────────────────────\n` +

        `🧩Uptime : ${dhms(node.stats.uptime)}\n` +

        `──────────────────────────────────────\n` +

        `\`\`\``

        }`}`:`${
          `\`\`\`js\n` +

        `❌ Node : ${node.options.identifier}\n` +

        `──────────────────────────────────────\n` +

        `🧩URL : ${node.options.host}\n` +

        `──────────────────────────────────────\n`+
          
        `\`\`\``
          
        }`}`
      )

      let y = [...x]

      const rembed = new EmbedBuilder()
        .setColor("#2F3136")
        .setFooter({ text: `Update at ` })
        .setTimestamp(Date.now());


      for (i = 0; i < y.length; i++) {
        rembed.addFields([{
          name: `ㅤ`,
          value: y[i]
        }])
      }

      msg.edit({ embeds: [rembed] });

    }, 10000);
  })

}


function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  return `${(
    bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))
  ).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
}



function dhms(ms) {
  let res = Math.floor(ms / (1000 * 60 * 60 * 24)) + "d " + Math.floor(ms / (1000 * 60 * 60)) % 24 + "h " + Math.floor(ms / (1000 * 60)) % 60 + "m"
  return res
}
