// Na úplně prvním řádku načteme skrytý soubor .env s tokenem
require('dotenv').config();

const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({ 
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers 
    ] 
});

// Opraveno varování (ready -> clientReady)
client.once('clientReady', () => { 
    console.log('🚍 DP Šakvice bot je online a připraven!'); 
});

client.on('messageCreate', async (message) => { 
    if (message.author.bot) return; 

    if (message.content === '!pravidla') { 
        // Vytvoření zeleného tlačítka pod pravidla uvnitř ActionRow
        const row = new ActionRowBuilder().addComponents( 
            new ButtonBuilder() 
                .setCustomId('accept_rules') 
                .setLabel('✔ Prijímam pravidlá') 
                .setStyle(ButtonStyle.Success) 
        ); 

        const casovky = `<t:${Math.floor(Date.now() / 1000)}:f>`;

        // PRVNÍ BAREVNÝ PANEL (Embed)
        const embed1 = new EmbedBuilder()
            .setColor('#0099ff') // Krásná modrá barva
            .setTitle('🚍 Dopravný podnik Šakvice, a.s.')
            .setDescription(`📄 **Pravidlá Dopravného podniku Šakvice, a.s.**\nAktualizované: ${casovky}`)
            .addFields(
                { name: '§1 Základné pravidlá', value: '1. Každý zamestnanec je povinný správať sa slušne, profesionálne a reprezentatívne.\n2. Rešpekt voči vedeniu, kolegom aj občanom je povinnosťou každého člena podniku.\n3. Vyvolávanie konfliktov, hádok, provokácií alebo toxického správania je zakázané.\n4. Každý zamestnanec reprezentuje Dopravný podnik Šakvice svojím správaním a vystupovaním.' },
                { name: '§2 Služba a aktivita', value: '1. Služba musí byť vykonávaná realisticky a v súlade s RP pravidlami.\n2. AFK počas služby bez vážneho dôvodu nie je povolené.\n3. Dlhodobá neaktivita môže viesť k vyradeniu z podniku.\n4. Vedúci pracovníci sú povinní ísť príkladom ostatným členom.' },
                { name: '§3 Vozidlá', value: '1. So služobnými vozidlami DP sa jazdí opatrne, bezpečne a realisticky.\n2. Úmyselné poškodzovanie alebo ničenie vozidiel je prísne zakázané.\n3. Po ukončení služby musia byť vozidlá odstavené na určenom mieste.\n4. Neoprávnené používanie služobných vozidiel je zakázané.' }
            );

        // DRUHÝ BAREVNÝ PANEL (Embed)
        const embed2 = new EmbedBuilder()
            .setColor('#0099ff')
            .addFields(
                { name: '§4 Komunikácia', value: '1. Komunikácia mustí prebiehať slušne a bez vulgarizmov.\n2. Spamovanie alebo zneužívanie textových kanálov je zakázané.\n3. Hlasové kanály počas služby slúžia predovšetkým na pracovnú komunikáciu.\n4. Každý člen je povinný rešpektovať pokyny vedenia podniku.\n5. Je zakázané vypisovať vedeniu podniku do súkromných správ ohľadom DP Šakvice.\n6. Všetky otázky, žiadosti alebo problémy týkajíce sa DP sa riešia výhradne cez ticket systém.' },
                { name: '§5 Uniformy a identita', value: '1. Počas služby je zamestnanec povinný mať vhodný pracovný outfit alebo uniformu.\n2. Vydávanie sa za vyššiu hodnosť je prísne zakázané.\n3. Meno aj hodnosť musia byť uvedené správne a pravdivo.' },
                { name: '§6 Nábor', value: '1. Nábor nových zamestnancov môže vykonávať iba oprávnený personál.\n2. Uchádzači sú povinní rešpektovať pokyny náborového tímu.\n3. Akákoľvek protekcia alebo zvýhodňovanie pri nábore je zakázané.\n4. Je zakázané vypisovať alebo sa neustále pýtať, kedy bude nábor.\n5. Súkromné alebo individuálne nábory mimo oficiálneho systému sú zakázané.' },
                { name: '§7 Tresty', value: '1. Za porušenie pravidiel môže byť udelené: upozornenie, pokarhanie, suspendácia, vyradenie z podniku.\n2. Vedenie DP má právo rozhodnúť o primeranom treste podľa závažnosti porušenia pravidiel.' },
                { name: '§8 Záverečné ustanovenia', value: '1. Neznalosť pravidiel neospravedlňuje ich porušenie.\n2. Vedenie Dopravného podniku Šakvice má právo pravidlá kedykoľvek upraviť alebo doplniť.\n3. Každý člen podniku je povinný tieto pravidlá dodržiavať.' }
            )
            .setFooter({ text: `🚍 Dopravný podnik Šakvice, a.s.` });

        // Odešleme první panel
        await message.channel.send({ embeds: [embed1] }); 

        // Odešleme druhý panel a pod něj přiložíme zelené tlačítko
        await message.channel.send({ embeds: [embed2], components: [row] }); 
    } 
});

client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isButton()) return; 

    if (interaction.customId === 'accept_rules') { 
        const role = interaction.guild.roles.cache.find(r => r.name === 'Súhlasí s pravidlami'); 

        if (!role) { 
            return interaction.reply({ content: '❌ Rola "Súhlasí s pravidlami" nebola nájdená.', ephemeral: true }); 
        } 

        if (interaction.member.roles.cache.has(role.id)) { 
            return interaction.reply({ content: '⏳ Pravidlá si už prijal.', ephemeral: true }); 
        } 

        await interaction.member.roles.add(role); 
        await interaction.reply({ content: '✔ Úspešne si prijal pravidlá a získal rolu.', ephemeral: true }); 
    } 
});

// Zde se bezpečně načte token ze souboru .env (tento řádek už NEMĚŇTE)
client.login(process.env.TOKEN);