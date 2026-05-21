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

            // Vytvoření první karty s pravidly (§1 až §4) s vynechanými řádky
            const embed1 = new EmbedBuilder()
                .setColor('#0056B3') // Firemní modrá barva DP Šakvice
                .setTitle('📄 Pravidlá Dopravného podniku Šakvice, a.s.')
                .setDescription('Neznalosť pravidiel neospravedlňuje ich porušenie.')
                .addFields(
                    { 
                        name: '§1 Základné pravidlá', 
                        value: '1. Každý zamestnanec je povinný správať sa slušne, profesionálne a reprezentatívne\n\n2. Rešpekt voči vedeniu, kolegom aj občanom je povinnosťou každého člena podniku\n\n3. Vyvolávanie konfliktov, hádok, provokácií alebo toxického správania je zakázané\n\n4. Každý zamestnanec reprezentuje Dopravný podnik Šakvice svojím správaním a vystupovaním' 
                    },
                    { 
                        name: '§2 Služba a aktivita', 
                        value: '1. Služba musí byť vykonávaná realisticky a v súlade s RP pravidlami\n\n2. AFK počas služby bez vážneho dôvodu nie je povolené\n\n3. Dlhodobá neaktivita môže viesť k vyradeniu z podniku\n\n4. Vedúci pracovníci sú povinní ísť príkladom ostatným členom' 
                    },
                    { 
                        name: '§3 Vozidlá', 
                        value: '1. So služobnými vozidlami DP sa jazdí opatrne, bezpečne a realisticky\n\n2. Úmyselné poškodzovanie alebo ničenie vozidiel je prísne zakázané\n\n3. Po ukončení služby musia byť vozidlá odstavené na určenom mieste\n\n4. Neoprávnené používanie služobných vozidiel je zakázané' 
                    },
                    { 
                        name: '§4 Komunikácia', 
                        value: '1. Komunikácia musí prebiehať slušne a bez vulgarizmov\n\n2. Spamovanie alebo zneužívanie textových kanálov je zakázané\n\n3. Hlasové kanály počas služby slúžia predovšetkým na pracovnú komunikáciu\n\n4. Každý člen je povinný rešpektovať pokyny vedenia podniku\n\n5. Je zakázané vypisovať vedeniu podniku do súkromných správ ohľadom DP Šakvice\n\n6. Všetky otázky, žiadosti alebo problémy týkajúce sa DP sa riešia výhradne cez ticket systém' 
                    }
                );

            // Vytvoření druhé karty s pravidly (§5 až §8) s vynechanými řádky
            const embed2 = new EmbedBuilder()
                .setColor('#0056B3')
                .setTitle('📄 Pravidlá Dopravného podniku Šakvice, a.s.')
                .addFields(
                    { 
                        name: '§5 Uniformy a identita', 
                        value: '1. Počas služby je zamestnanec povinný habt vhodný pracovný outfit alebo uniformu\n\n2. Vydávanie sa za vyššiu hodnosť je prísne zakázané\n\n3. Meno aj hodnosť musia byť uvedené správne a pravdivo' 
                    },
                    { 
                        name: '§6 Nábor', 
                        value: '1. Nábor nových zamestnancov môže vykonávať iba oprávnený personál\n\n2. Uchádzači sú povinní rešpektovať pokyny náborového tímu\n\n3. Akákoľvek protekcia alebo zvýhodňovanie pri nábore je zakázané\n\n4. Je zakázané vypisovať alebo sa neustále pýtať, kedy bude nábor\n\n5. Súkromné alebo individuálne nábory mimo oficiálneho systému sú zakázané' 
                    },
                    { 
                        name: '§7 Tresty', 
                        value: '1. Za porušenie pravidiel môže byť udelené:\n• upozornenie\n• pokarhanie\n• suspendácia\n• vyradenie z podniku\n\n2. Vedenie DP má právo rozhodnúť o primeranom treste podľa závažnosti porušenia pravidiel' 
                    },
                    { 
                        name: '§8 Záverečné ustanovenia', 
                        value: '1. Neznalosť pravidiel neospravedlňuje ich porušenie\n\n2. Vedenie Dopravného podniku Šakvice má právo pravidlá kedykoľvek upraviť alebo doplniť\n\n3. Každý člen podniku je povinný tieto pravidlá dodržiavať' 
                    }
                )
                .setFooter({ text: '🚍 Dopravný podnik Šakvice, a.s.' });

            // Odeslání pravidel do kanálu, kde byl napsán příkaz
            await message.channel.send({ embeds: [embed1, embed2] });

        } catch (error) {
            console.error('Chyba při zpracování příkazu !pravidla:', error);
        }
    }
});

// Přihlášení bota
client.login(process.env.TOKEN);