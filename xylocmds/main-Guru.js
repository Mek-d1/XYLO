import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const logo = 'https://files.catbox.moe/yfcwx5.jpg' 
  
  const text = `
╭━━━━━━━━━━━━╮
┃ * SOCIALS *
╰━━━━━━━━━━━━╯

Join our official groups & channels to stay connected!

Thank you for your support!
`.trim()

  const buttons = []
  
  const urls = [
    ['GitHub Profile', 'https://github.com/Mek-d1'],
    ['YouTube Channel', 'https://youtube.com/@mek-d1?si=R9WdrfowTYbO8gB9'],
    ['Telegram Channel', 'https://t.me/@X_MDB']
  ]
  
  await conn.sendButton(
    m.chat, 
    text,
    '© XYLO  2025', 
    logo, 
    buttons, 
    null, 
    urls,
    m 
  )
  
  m.react('✅')
}

handler.help = ['gpxylo']
handler.tags = ['main']
handler.command = ['groups', 'groupxylo', 'xygp', 'xgp', 'gpxylo']
handler.desc = 'Get the official groups and channels of XYLO'

export default handler
