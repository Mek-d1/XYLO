import fs from 'fs';
import path from 'path';
import os from 'os';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  try {
    const menuThumbnail = 'https://files.catbox.moe/yfcwx5.jpg';
    const lazackpath = path.join(process.cwd(), 'xylocmds'); // Ensure absolute path

    let commandGroups = {};

    // Ensure the lazackcmds directory exists
    if (!fs.existsSync(lazackpath)) {
      console.error('xylocmds directory does not exist.');
      return m.reply('Could not find command files.');
    }

    try {
      const commandFiles = fs.readdirSync(lazackpath).filter(file => file.endsWith('.js'));

      if (commandFiles.length === 0) {
        console.log('❌ No command files found in xylocmds.');
      }

      for (const file of commandFiles) {
        const cmdPath = path.join(lazackpath, file);
        let cmdModule = require(cmdPath); // Using require() for compatibility

        // Check if handler has 'command' and 'tags' properties
        if (cmdModule.default && cmdModule.default.command) {
          const cmd = cmdModule.default;

          // Extract command names (could be an array or a single string)
          const cmdNames = Array.isArray(cmd.command) ? cmd.command : [cmd.command];

          // Extract tags (could be an array or default to 'Other')
          const tags = Array.isArray(cmd.tags) ? cmd.tags : ['Other'];

          for (const tag of tags) {
            if (!commandGroups[tag]) commandGroups[tag] = [];
            cmdNames.forEach(name => commandGroups[tag].push(`➤ *${name}*`)); // Listing commands properly
          }
        } else {
          console.warn(`⚠️ Command in ${file} doesn't have 'command' or 'tags' properties.`);
        }
      }
    } catch (err) {
      console.error('❌ Error reading commands:', err);
      return m.reply('❌ Failed to load commands.');
    }

    const sysInfo = {
      totalRAM: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
      usedRAM: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2)} GB`,
      uptime: moment.duration(os.uptime(), 'seconds').humanize(),
      timestamp: moment.tz('Africa/Lagos').format('ddd DD/MM/YY HH:mm:ss'),
      platform: `${os.platform()} ${os.arch()}`,
      version: '2.1.0',
      developer: '@DavidX',
    };

    let menuHeader = `
📌 *XYLO-AI*
👤 *User:* ${m.pushName || 'User'}
🕒 *Time:* ${sysInfo.timestamp}

📊 *System Info:*
⏱ *Uptime:* ${sysInfo.uptime}

🔍 *Available Commands:*`.trim();

    let sections = [];
    for (const [tag, commands] of Object.entries(commandGroups)) {
      sections.push(`\n✨ *${tag.toUpperCase()}* ✨\n${commands.join('\n')}`);
    }

    let fullMenu = menuHeader + (sections.length ? sections.join('\n') : "\n❌ No commands found!");

    await conn.sendMessage(m.chat, {
      image: { url: menuThumbnail },
      caption: fullMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
      }
    }, { quoted: m });

  } catch (error) {
    console.error('❌ Error in allmenu handler:', error);
    m.reply('❌ An unexpected error occurred.');
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu'];

export default handler;
