let handler = async (m, { conn }) => {
    let vcard = `
  BEGIN:VCARD
  VERSION:3.0
  N:;Xylo;;;
  FN:Xylo
  ORG:Xmd
  TITLE:
  TEL;waid=2349133354644:12567980814
  X-ABLabel:Lazack
  X-WA-BIZ-DESCRIPTION:
  X-WA-BIZ-NAME:Lazack
  END:VCARD
    `.trim();
  
    await conn.sendMessage(
      m.chat,
      {
        contacts: {
          displayName: "DavidX",
          contacts: [{ vcard }],
        },
      },
      { quoted: m }
    );
  };
  
  handler.help = ["owner"];
  handler.tags = ["main"];
  handler.command = ["owner", "creator", "creador", "dueño"];
  
  export default handler;
  
