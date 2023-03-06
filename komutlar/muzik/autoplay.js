const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap", "otomatikoynat", "oto-oynat", "otomatik-oynat"],
        description: "Mevcut çalan şarkı bittiğinde otomatik olarak bir sonraki şarkıyı oynatır veya radyo modunu açar/kapatır.",
        kategori: "muzik"
    },
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.find(channel => channel.name === "log");

        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("Şu anda kuyrukta hiçbir şey yok!");
        
        const { channel } = message.member.voice;
        if (!channel || channel !== message.guild.members.me.voice.channel) return message.channel.send("Aynı / sesli kanalda olmanız gerekmektedir.");

        const embed = new MessageEmbed()
            .setColor("#000001");

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
    
            embed.setDescription(`\`⏯\` **Otomatik Oynat** modu başarıyla etkinleştirildi.`);
            message.channel.send({ embeds: [embed] });

            if (logChannel) {
                embed.setDescription(`\`⏯\` **${message.author.tag}** otomatik oynat modunu başarıyla etkinleştirdi.`);
                logChannel.send({ embeds: [embed] });
            }
        } else {
            client.distube.toggleAutoplay(message);

            embed.setDescription(`\`⏯\` **Otomatik Oynat** modu başarıyla devre dışı bırakıldı.`);
            message.channel.send({ embeds: [embed] });

            if (logChannel) {
                embed.setDescription(`\`⏯\` **${message.author.tag}** otomatik oynat modunu başarıyla devre dışı bıraktı.`);
                logChannel.send({ embeds: [embed] });
            }
        }
    }
};



// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac