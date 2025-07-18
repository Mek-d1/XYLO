import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw 'uhm.. what do you want to say?';
    await m.react('🤖');

    const prompt = encodeURIComponent(text);
    let apiurl = `https://dark.guruapi.tech/egpt?prompt=${prompt}`;

    const result = await fetch(apiurl);
    const response = await result.json();
    
    if (!response.message) throw 'No result found';

    const replyText = response.message;
    await conn.sendButton(
      m.chat, 
      replyText, 
      author, 
      'https://files.catbox.moe/yfcwx5.jpg', 
      [['Script', `.sc`]], 
      null, 
      [['Follow Me', `https://github.com/Mek-d1`]], 
      m
    );
  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. We are trying hard to fix it ASAP.');
  }
};

handler.help = ['darky <text>'];
handler.tags = ['tools'];
handler.command = ['darky', 'darkgpt']

export default handler;
