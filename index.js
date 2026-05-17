const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('🚍 DP Šakvice bot je online!');
});

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;

    if (message.content === '!pravidla') {

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('📜 Pravidlá Dopravného podniku Šakvice, a.s.')
            .setDescription('Oficiálne pravidlá Dopravného podniku Šakvice.')
            .addFields(
                {
                    name: '§1 Základné pravidlá',
                    value:
                    '• Každý zamestnanec je povinný správať sa slušne a profesionálne.\n' +
                    '• Rešpekt voči vedeniu, kolegom aj občanom je povinný.\n' +
                    '• Vyvolávanie konfliktov a toxické správanie je zakázané.'
                },
                {
                    name: '§2 Služba a aktivita',
                    value:
                    '• Služba musí byť vykonávaná realisticky.\n' +
                    '• AFK počas služby bez dôvodu nie je povolené.\n' +
                    '• Dlhodobá neaktivita môže viesť k vyradeniu.'
                },
                {
                    name: '§3 Vozidlá',
                    value:
                    '• So služobnými vozidlami sa jazdí opatrne.\n' +
                    '• Úmyselné ničenie vozidiel je zakázané.\n' +
                    '• Vozidlá musia byť odstavené na určenom mieste.'
                },
                {
                    name: '§4 Komunikácia',
                    value:
                    '• Komunikácia musí byť slušná.\n' +
                    '• Spamovanie je zakázané.\n' +
                    '• Rešpektovanie vedenia je povinné.'
                },
                {
                    name: '§5 Tresty',
                    value:
                    '• upozornenie\n' +
                    '• pokarhanie\n' +
                    '• suspendácia\n' +
                    '• vyradenie z podniku'
                }
            )
            .setFooter({ text: '🚍 Dopravný podnik Šakvice, a.s.' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);