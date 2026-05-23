require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.once('ready', () => console.log('🚍 Online'));

client.on('messageCreate', async (message) => { 
    if (message.author.bot || message.content !== '!dppravidla') return; 

    try { await message.delete(); } catch (e) {}

    const ted = new Date();
    const datum = ted.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const cas = ted.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

    const embed1 = new EmbedBuilder()
        .setColor('#0052b4')
        .setTitle('📄 Pravidlá Dopravného podniku Šakvice, a.s.')
        .setDescription(
            '**§1 Základné pravidlá**\n1. Každý zamestnanec je povinný správať sa slušne, profesionálne a reprezentatívne\n2. Rešpekt voči vedeniu, kolegom aj občanom je povinnosťou každého člena podniku\n3. Vyvolávanie konfliktov, hádok, provokácií alebo toxického správania je zakázané\n4. Každý zamestnanec reprezentuje Dopravný podnik Šakvice svojím správaním a vystupovaním\n\n' +
            '**§2 Služba a aktivita**\n1. Služba musí byť vykonávaná realisticky a v súlade s RP pravidlami\n2. AFK počas služby bez vážneho dôvodu nie je povolené\n3. Dlhodobá neaktivita môže viesť k vyradeniu z podniku\n4. Vedúci pracovníci sú povinní ísť príkladom ostatným členom\n\n' +
            '**§3 Vozidlá**\n1. So služobnými vozidlami DP sa jazdí opatrne, bezpečne a realisticky\n2. Úmyselné poškodzovanie alebo ničenie vozidiel je prísne zakázané\n3. Po ukončení služby musia byť vozidlá odstavené na určenom mieste\n4. Neoprávnené používanie služobných vozidiel je zakázané'
        );

    const embed2 = new EmbedBuilder()
        .setColor('#0052b4')
        .setDescription(
            '**§4 Komunikácia**\n1. Komunikácia musí prebiehať slušne a bez vulgarizmov\n2. Spamovanie alebo zneužívanie textových kanálov je zakázané\n3. Hlasové kanály počas služby slúžia predovšetkým na pracovnú komunikáciu\n4. Každý člen je povinný rešpektovať pokyny vedenia podniku\n5. Je zakázané vypisovať vedeniu podniku do súkromných správ ohľadom DP Šakvice\n6. Všetky otázky, žiadosti alebo problémy týkajúce se DP sa riešia výhradne cez ticket systém\n\n' +
            '**§5 Uniformy a identita**\n1. Počas služby je zamestnanec povinný mať vhodný pracovný outfit alebo uniformu\n2. Vydávanie sa za vyššiu hodnosť je prísne zakázané\n3. Meno aj hodnosť musí byť uvedené správne a pravdivo\n\n' +
            '**§6 Nábor**\n1. Nábor nových zamestnancov může vykonávať iba oprávnený personál\n2. Uchádzači sú povinní rešpektovať pokyny náborového tímu\n3. Akákoľvek protekcia alebo zvýhodňovanie pri nábore je zakázané\n4. Je zakázané vypisovať alebo sa neustále pýtať, kedy bude nábor\n5. Súkromné nábory mimo oficiálneho systému sú zakázané\n\n' +
            '**§7 Tresty**\n1. Za porušenie pravidiel může byť udelené:\n° upozornenie,\n° pokarhanie,\n° suspendácia,\n° vyradenie z podniku.\n2. Vedenie DP má právo rozhodnúť o primeranom treste podľa závažnosti porušenia pravidiel\n\n' +
            '**§8 Záverečné ustanovenia**\n1. Neznalosť pravidiel neospravedlňuje ich porušenie\n2. Vedenie Dopravného podniku Šakvice má právo pravidlá kedykoľvek upraviť alebo doplniť\n3. Každý člen podniku je povinný tieto pravidlá dodržiavať'
        )
        .setFooter({ text: `🚍 Dopravný podnik Šakvice, a.s. | ${datum} ${cas}` });

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('accept_rules_dp').setLabel('✔ Prijímam pravidlá').setStyle(ButtonStyle.Success)
    );

    await message.channel.send({ embeds: [embed1, embed2], components: [row] }); 
});

client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isButton() || interaction.customId !== 'accept_rules_dp') return; 

    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });
    const role = interaction.guild.roles.cache.find(r => r.name === '✓ • Súhlasí s pravidlami'); 

    if (!role) return interaction.editReply({ content: '❌ Rola nebola nájdená.' }); 
    if (interaction.member.roles.cache.has(role.id)) return interaction.editReply({ content: '⏳ Už si prijal.' }); 

    try {
        await interaction.member.roles.add(role); 
        await interaction.editReply({ content: '✔ Úspešne prijaté.' }); 
    } catch (e) {
        await interaction.editReply({ content: '❌ Chybujú práva bota.' });
    }
});

client.login(process.env.TOKEN);