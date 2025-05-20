let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender)
  var vn = 'https://files.catbox.moe/tpvxix.mp3'
  let url = 'https://github.com/Mek-d1/XYLO'
  let murl = ''
  let img = 'https://i.imgur.com/QMyKIPq.jpeg'

  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '2349133354644@s.whatsapp.net' } : {}),
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
    fileName: 'xylo',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '✨ *XYLO* ✨',
        body: 'XYLO - Stay Alive and Energized!',
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029VarIiQL5a24AU5ZCVV0G',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  }

  let aliveMessage = `🔥 *Hey ${name}!*\nYour bot is alive and running smoothly. Let's keep the energy flowing! 💥\n\nCheck out more updates:\n🔗 [GitHub Repository](https://github.com/Mek-d1/XYLO)\n\nFeel free to ask for any help! 💬`

  // Send alive message along with the audio and contact message
  await conn.sendMessage(m.chat, { text: aliveMessage, mentions: [m.sender] }, { quoted: con })
  await conn.sendMessage(m.chat, doc, { quoted: con })
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i

export default handler
