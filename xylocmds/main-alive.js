let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender)
  var vn = 'https://files.catbox.moe/fcweo1.mp3'
  let url = 'https://github.com/Mek-d1/XYLO'
  let murl = 'https://youtube.com/@mek-d1?si=R9WdrfowTYbO8gB9'
  let img = 'https://files.catbox.moe/yfcwx5.jpg'
  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '12567980814@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  let doc = {
    audio: {
      url: vn,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'Xylo',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'I AM ALIVE',
        body: 'XYLO BOT',
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029VarIiQL5a24AU5ZCVV0G',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  }

  await conn.sendMessage(m.chat, doc, { quoted: con })
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i
handler.desc = 'Check if the bot is alive'

export default handler
