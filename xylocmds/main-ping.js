import { exec } from 'child_process';
import speed from 'performance-now';

let handler = async (m, { conn }) => {
  let thumbnail = 'https://files.catbox.moe/yfcwx5.jpg';
  
  let fgg = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `Xylo`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Davidi X;;;\nFN:Xylo Ai\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  let timestamp = speed();
  let pingMsg = await conn.sendMessage(m.chat, { text: '*🔄 Checking ping...*' }, { quoted: fgg });

  exec('uptime', async (error, stdout) => {
    let latency = (speed() - timestamp).toFixed(2);

    if (error) {
      return conn.sendMessage(m.chat, { text: `⚠️ *Error checking ping!*

${error.message}` }, { quoted: pingMsg });
    }

    let result = `*Xylo Ping*

📡 *Speed:* ${latency} ms
🚀 *Server Uptime:* ${stdout.trim()}`;
    
    await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: pingMsg.key,
          type: 14,
          editedMessage: { conversation: result },
        },
      },
      {}
    );
  });
};

handler.help = ['ping'];
handler.tags = ['main'];
handler.command = ['ping', 'speed'];

export default handler;
