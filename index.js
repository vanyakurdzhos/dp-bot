require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 🔒 ANTI-SPAM
const cooldown = new Map();
const buttonCooldown = new Map();

client.once('ready', () => {
    console.log('DP Šakvice bot je online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!pravidla') {

        const now = Date.now();
        const userId = message.author.id;

        // 🔒 cooldown 10s
        if (cooldown.has(userId)) {
            const diff = now - cooldown.get(userId);
            if (diff < 10000) {
                return message.reply('⏳ Počkaj prosím pár sekúnd pred ďalším použitím príkazu.');
            }
        }
        cooldown.set(userId, now);

        try {

            if (message.deletable) {
                await message.delete();
            }

            const timeFooter = `🚍 Dopravný podnik Šakvice, a.s. | <t:${Math.floor(Date.now() / 1000)}:f>`;

            // ================= EMBED 1 =================
            const embed1 = new EmbedBuilder()
                .setColor('#0056B3')
                .setDescription(`
📄 **Pravidlá Dopravného podniku Šakvice, a.s.**

━━━━━━━━━━━━━━━━━━

**§1 Základné pravidlá**

1. Každý zamestnanec je povinný správať sa slušne a profesionálne  
2. Rešpekt voči vedeniu aj kolegom je povinnosťou  
3. Toxické správanie, konflikty a provokácie sú zakázané  
4. Každý zamestnanec reprezentuje DP Šakvice  

━━━━━━━━━━━━━━━━━━

**§2 Služba a aktivita**

1. Služba musí byť realistická a RP  
2. AFK bez dôvodu nie je povolené  
3. Dlhodobá neaktivita môže viesť k vyradeniu  
4. Vedúci pracovníci musia ísť príkladom  

━━━━━━━━━━━━━━━━━━

**§3 Vozidlá**

1. Služobné vozidlá sa používajú realisticky  
2. Úmyselné poškodzovanie je zakázané  
3. Vozidlá sa po službe odstavujú na určené miesto  
4. Neoprávnené používanie je zakázané  

━━━━━━━━━━━━━━━━━━

**§4 Komunikácia**

1. Komunikácia musí byť slušná a bez vulgarizmov  
2. Spamovanie je zakázané  
3. Voice kanály slúžia na prácu  
4. Rešpektovanie vedenia je povinné  
5. Zakázané písať vedeniu do DM  
6. Všetko sa rieši cez ticket systém  
`);

            // ================= EMBED 2 =================
            const embed2 = new EmbedBuilder()
                .setColor('#0056B3')
                .setDescription(`
**§5 Uniformy a identita**

1. Povinná uniforma alebo vhodný pracovný outfit  
2. Vydávanie sa za vyššiu hodnosť je zakázané  
3. Meno a hodnosť musia byť pravdivé  

━━━━━━━━━━━━━━━━━━

**§6 Nábor**

1. Nábor vykonáva iba oprávnený personál  
2. Uchádzači musia rešpektovať pokyny  
3. Protekcia je zakázaná  
4. Neptajte sa neustále na nábory  
5. Súkromné nábory sú zakázané  

━━━━━━━━━━━━━━━━━━

**§7 Tresty**

1. Možné tresty:
• upozornenie  
• pokarhanie  
• suspendácia  
• vyradenie  

2. Vedenie rozhoduje podľa závažnosti  

━━━━━━━━━━━━━━━━━━

**§8 Záverečné ustanovenia**

1. Neznalosť pravidiel neospravedlňuje porušenie  
2. Vedenie si vyhradzuje právo pravidlá meniť  
3. Každý člen je povinný pravidlá dodržiavať  

━━━━━━━━━━━━━━━━━━

🚍 Dopravný podnik Šakvice, a.s.
`)
                .setFooter({ text: timeFooter });

            // ================= BUTTON =================
            const button = new ButtonBuilder()
                .setCustomId('accept_rules')
                .setLabel('✔ Prijímam pravidlá')
                .setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(button);

            await message.channel.send({
                embeds: [embed1, embed2],
                components: [row]
            });

        } catch (error) {
            console.error(error);
        }
    }
});

// ================= BUTTON HANDLER =================
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'accept_rules') {

        const now = Date.now();
        const userId = interaction.user.id;

        if (buttonCooldown.has(userId)) {
            const diff = now - buttonCooldown.get(userId);

            if (diff < 10000) {
                return interaction.reply({
                    content: '⏳ Pravidlá si už potvrdil, počkaj chvíľu.',
                    ephemeral: true
                });
            }
        }

        buttonCooldown.set(userId, now);

        await interaction.reply({
            content: '✔ Ďakujeme! Pravidlá boli úspešne prijaté.',
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);