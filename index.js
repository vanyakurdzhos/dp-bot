require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js');

const client = new Client({ 
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers 
    ] 
});

client.once('ready', () => { 
    console.log('🚍 DP Šakvice bot je online a připraven!'); 
});

client.on('messageCreate', async (message) => { 
    if (message.author.bot) return; 

    if (message.content === '!dppravidla') { 
        try { await message.delete(); } catch (e) { console.error(e); }

        const row = new ActionRowBuilder().addComponents( 
            new ButtonBuilder() 
                .setCustomId('accept_rules_dp') 
                .setLabel('✔ Prijímam pravidlá') 
                .setStyle(ButtonStyle.Success) 
        ); 

        const barvaEmbedu = '#0052b4'; 
        const ted = new Date();
        const datum = ted.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const cas = ted.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
        const textPaticky = `🚍 Dopravný podnik Šakvice, a.s. | ${datum} ${cas}`;

        const embed1 = new EmbedBuilder()
            .setColor(barvaEmbedu)
            .setTitle('📄 Pravidlá Dopravného podniku Šakvice, a.s.')
            .setDescription('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§1 Základné pravidlá**\n\n' +
                           '1. Každý zamestnanec je povinný správať sa slušne, profesionálne a reprezentatívne\n\n' +
                           '2. Rešpekt voči vedeniu, kolegom aj občanom je povinnosťou každého člena podniku\n\n' +
                           '3. Vyvolávanie konfliktov, hádok, provokácií alebo toxického správania je zakázané\n\n' +
                           '4. Každý zamestnanec reprezentuje Dopravný podnik Šakvice svojím správaním a vystupovaním\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§2 Služba a aktivita**\n\n' +
                           '1. Služba musí byť vykonávaná realisticky a v súlade s RP pravidlami\n\n' +
                           '2. AFK počas služby bez vážneho dôvodu nie je povolené\n\n' +
                           '3. Dlhodobá neaktivita môže viesť k vyradeniu z podniku\n\n' +
                           '4. Vedúci pracovníci sú povinní ísť príkladom ostatným članom\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§3 Vozidlá**\n\n' +
                           '1. So služobnými vozidlami DP sa jazdí opatrne, bezpečne a realisticky\n\n' +
                           '2. Úmyselné poškodzovanie alebo ničenie vozidiel je prísne zakázané\n\n' +
                           '3. Po ukončení služby musia byť vozidlá odstavené na určenom mieste\n\n' +
                           '4. Neoprávnené používanie služobných vozidiel je zakázané');

        const embed2 = new EmbedBuilder()
            .setColor(barvaEmbedu)
            .setDescription('**§4 Komunikácia**\n\n' +
                           '1. Komunikácia mustí prebiehať slušne a bez vulgarizmov\n\n' +
                           '2. Spamovanie alebo zneužívanie textových kanálov je zakázané\n\n' +
                           '3. Hlasové kanály počas služby slúžia predovšetkým na pracovnú komunikáciu\n\n' +
                           '4. Každý člen je povinný rešpektovať pokyny vedenia podniku\n\n' +
                           '5. Je zakázané vypisovať vedeniu podniku do súkromných správ ohľadom DP Šakvice\n\n' +
                           '6. Všetky otázky, žiadosti alebo problémy týkajúce se DP sa riešia výhradne cez ticket systém\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§5 Uniformy a identita**\n\n' +
                           '1. Počas služby je zamestnanec povinný mať vhodný pracovný outfit alebo uniformu\n\n' +
                           '2. Vydávanie sa za vyššiu hodnosť je prísne zakázané\n\n' +
                           '3. Meno aj hodnosť musí byť uvedené správne a pravdivo\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§6 Nábor**\n\n' +
                           '1. Nábor nových zamestnancov môže vykonávať iba oprávnený personál\n\n' +
                           '2. Uchádzači sú povinní rešpektovať pokyny náborového tímu\n\n' +
                           '3. Akákoľvek protekcia alebo zvýhodňovanie pri nábore je zakázané\n\n' +
                           '4. Je zakázané vypisovať alebo sa neustále pýtať, kedy bude nábor\n\n' +
                           '5. Súkromné alebo individuálne nábory mimo oficiálneho systému sú zakázané\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§7 Tresty**\n\n' +
                           '1. Za porušenie pravidiel může byť udelené:\n\n' +
                           '° upozornenie,\n\n' +
                           '° pokarhanie,\n\n' +
                           '° suspendácia,\n\n' +
                           '° vyradenie z podniku.\n\n' +
                           '2. Vedenie DP má právo rozhodnúť o primeranom treste podľa závažnosti porušenia pravidiel\n\n' +
                           '⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n\n' +
                           '**§8 Záverečné ustanovenia**\n\n' +
                           '1. Neznalosť pravidiel neospravedlňuje ich porušenie\n\n' +
                           '2. Vedenie Dopravného podniku Šakvice má právo pravidlá kedykoľvek upraviť alebo doplniť\n\n' +
                           '3. Každý člen podniku je povinný tieto pravidlá dodržiavať')
            .setFooter({ text: textPaticky });

        await message.channel.send({ embeds: [embed1] }); 
        await message.channel.send({ embeds: [embed2], components: [row] }); 
    } 
});

client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isButton()) return; 

    if (interaction.customId === 'accept_rules_dp') { 
        await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

        const roles = await interaction.guild.roles.fetch();
        const role = roles.find(r => r.name === '✓ • Súhlasí s pravidlami'); 

        if (!role) { 
            return interaction.editReply({ content: '❌ Rola "✓ • Súhlasí s pravidlami" nebola nájdená na serveri.' }); 
        } 

        if (interaction.member.roles.cache.has(role.id)) { 
            return interaction.editReply({ content: '⏳ Pravidlá si už prijal.' }); 
        } 

        try {
            await interaction.member.roles.add(role); 
            await interaction.editReply({ content: '✔ Úspešne si prijal pravidlá a získal rolu.' }); 
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: '❌ Nepodarilo sa pridať rolu. Skontroluj, či je rola bota v nastaveniach serveru VYŠŠIE ako táto rola.' });
        }
    } 
});

client.login(process.env.TOKEN);