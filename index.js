require('dotenv').config(); // Načte token ze souboru .env
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Inicializace bota se správnými intenty
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Událost při úspěšném spuštění bota
client.once('ready', () => {
    console.log('🚍 DP Šakvice bot je online!');
});

// Událost při odeslání zprávy na serveru
client.on('messageCreate', async (message) => {
    // Ignorovat zprávy od ostatních botů
    if (message.author.bot) return;

    // Příkaz !pravidla
    if (message.content === '!pravidla') {
        try {
            // Smazání příkazu od uživatele, aby zůstal chat čistý
            if (message.deletable) {
                await message.delete();
            }

            // První barevná karta (Embed 1) - Přesný text od §1 do §4
            const embed1 = new EmbedBuilder()
                .setColor('#0056B3') // Krásná firemní modrá barva
                .setDescription(`
📄 **Pravidlá Dopravného podniku Šakvice, a.s.**

━━━━━━━━━━━━━━━━━━

**§1 Základné pravidlá**

1. Každý zamestnanec je povinný správať sa slušne, profesionálne a reprezentatívne

2. Rešpekt voči vedeniu, kolegom aj občanom je povinnosťou každého člena podniku

3. Vyvolávanie konfliktov, hádok, provokácií alebo toxického správania je zakázané

4. Každý zamestnanec reprezentuje Dopravný podnik Šakvice svojím správaním a vystupovaním

━━━━━━━━━━━━━━━━━━

**§2 Služba a aktivita**

1. Služba musí byť vykonávaná realisticky a v súlade s RP pravidlami

2. AFK počas služby bez vážneho dôvodu nie je povolené

3. Dlhodobá neaktivita môže viesť k vyradeniu z podniku

4. Vedúci pracovníci sú povinní ísť príkladom ostatným členom

━━━━━━━━━━━━━━━━━━

**§3 Vozidlá**

1. So služobnými vozidlami DP sa jazdí opatrne, bezpečne a realisticky

2. Úmyselné poškodzovanie alebo ničenie vozidiel je prísne zakázané

3. Po ukončení služby musia byť vozidlá odstavené na určenom mieste

4. Neoprávnené používanie služobných vozidiel je zakázané

━━━━━━━━━━━━━━━━━━

**§4 Komunikácia**

1. Komunikácia musí prebiehať slušne a bez vulgarizmov

2. Spamovanie alebo zneužívanie textových kanálov je zakázané

3. Hlasové kanály počas služby slúžia predovšetkým na pracovnú komunikáciu

4. Každý člen je povinný rešpektovať pokyny vedenia podniku

5. Je zakázané vypisovať vedeniu podniku do súkromných správ ohľadom DP Šakvice

6. Všetky otázky, žiadosti alebo problémy týkajúce sa DP sa riešia výhradne cez ticket systém
                `);

            // Druhá barevná karta (Embed 2) - Přesný text od §5 do konce
            const embed2 = new EmbedBuilder()
                .setColor('#0056B3') // Stejná modrá barva pro sjednocení designu
                .setDescription(`
━━━━━━━━━━━━━━━━━━

**§5 Uniformy a identita**

1. Počas služby je zamestnanec povinný mať vhodný pracovný outfit alebo uniformu

2. Vydávanie sa za vyššiu hodnosť je prísne zakázané

3. Meno aj hodnosť musia byť uvedené správne a pravdivo

━━━━━━━━━━━━━━━━━━

**§6 Nábor**

1. Nábor nových zamestnancov môže vykonávať iba oprávnený personál

2. Uchádzači sú povinní rešpektovať pokyny náborového tímu

3. Akákoľvek protekcia alebo zvýhodňovanie pri nábore je zakázané

4. Je zakázané vypisovať alebo sa neustále pýtať, kedy bude nábor

5. Súkromné alebo individuálne nábory mimo oficiálneho systému sú zakázané

━━━━━━━━━━━━━━━━━━

**§7 Tresty**

1. Za porušenie pravidiel môže byť udelené:

• upozornenie
• pokarhanie
• suspendácia
• vyradenie z podniku

2. Vedenie DP má právo rozhodnúť o primeranom treste podľa závažnosti porušenia pravidiel

━━━━━━━━━━━━━━━━━━

**§8 Záverečné ustanovenia**

1. Neznalosť pravidiel neospravedlňuje ich porušenie

2. Vedenie Dopravného podniku Šakvice má právo pravidlá kedykoľvek upraviť alebo doplniť

3. Každý člen podniku je povinný tieto pravidlá dodržiavať

━━━━━━━━━━━━━━━━━━

🚍 Dopravný podnik Šakvice, a.s.
                `);

            // Odeslání obou barevných karet najednou
            await message.channel.send({ embeds: [embed1, embed2] });

        } catch (error) {
            console.error('Chyba při odesílání barevných pravidel:', error);
        }
    }
});

// Přihlášení bota
client.login(process.env.TOKEN);