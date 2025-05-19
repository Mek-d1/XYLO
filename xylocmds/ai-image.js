import remini from '../lib/remini.js'; // Importing the remini function

let handler = async (m, { conn, usedPrefix, command, quoted }) => {
  try {
    let q = quoted ? quoted : m;
    
    console.log('Quoted:', q);

    let mime = (q.msg || q).mimetype || q.mediaType || '';
    console.log('Mime:', mime);

    if (!mime) {
      console.error('❌ No mime type found.');
      return m.reply(`❌ Please reply to an image with the caption *${usedPrefix + command}*`);
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      console.error(`❌ The quoted message does not contain a valid image. Mime: ${mime}`);
      return m.reply(`❌ Please reply with an image to use *${usedPrefix + command}*`);
    }

    await conn.reply(m.chat, '⏳ Processing image... Please wait a moment.', m);

    let media;
    try {
      console.log('Downloading image...');
      media = await q.download();
      if (!Buffer.isBuffer(media)) {
        console.error('❌ Invalid image buffer received from quoted message.');
        return m.reply('❌ The quoted image is invalid. Please try again.');
      }
      console.log('Image downloaded:', media);
    } catch (error) {
      console.error('❌ Error downloading image from quoted message:', error);
      return m.reply('❌ Something went wrong while downloading the image. Please try again.');
    }

    let enhancementMethod;
    switch (command) {
      case 'dehaze':
        enhancementMethod = 'dehaze';
        break;
      case 'recolor':
        enhancementMethod = 'recolor';
        break;
      case 'hdr':
        enhancementMethod = 'enhance';
        break;
      case 'remini':
      default:
        enhancementMethod = 'enhance';
        break;
    }

    try {
      console.log(`Enhancing image using method: ${enhancementMethod}...`);
      let enhancedImage = await remini(media, enhancementMethod);
      console.log('Image enhanced successfully.');

      await conn.sendMessage(m.chat, {
        image: enhancedImage,
        caption: `Enjoy the enhanced image!`
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error enhancing image:', error);
      return m.reply('❌ Something went wrong while enhancing the image. Please try again later.');
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return m.reply('❌ An unexpected error occurred. Please try again later.');
  }
};

// Command definition
handler.help = ['remini', 'dehaze', 'recolor', 'hdr'];
handler.tags = ['image'];
handler.command = ['remini', 'dehaze', 'recolor', 'hdr'];

export default handler;
