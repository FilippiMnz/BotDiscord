const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("checkout")
        .setDescription("Painel de compras"),

    async execute(interaction){
        
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("language_select")
                    .setPlaceholder("Select your language / Selecione seu idioma")
                    .addOptions(
                        {label: "English", description: "Tipo:Categoria", value: "english"},
                        {label: "Português", description: "Tipo:Categoria", value: "portuguese"}
                    )
            );


        const initialMessage = await interaction.reply({ content: ">>> # PAINEL DE COMPRA \n ### Adquira os melhores serviços do mercado, faça a sua compra e receba automaticamente. \n ### Acquire the best services on the market, make your purchase and receive automatically. \n ### Pagamento Automático/ Automatic Payment \n **PIX**  \n ### Outros métodos: | **Another payment method:**  \n ###  Picpay, Boleto e Paypal.  \n  ### Suporte:| Support: ", components: [row] });
        // Aguarda a seleção do idioma
        const filter = i => i.customId === 'language_select' && i.user.id === interaction.user.id;
        const collector = initialMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async interaction => {
            const chosenLanguage = interaction.values[0];

            // Exibir um novo menu dependendo do idioma escolhido
            if (chosenLanguage === 'english') {
                // Menu em inglês
                await showEnglishMenu(interaction);
            } else if (chosenLanguage === 'portuguese') {
                // Menu em português
                await showPortugueseMenu(interaction);
            }
        });
    }
};

async function showEnglishMenu(interaction) {
    const englishMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("english_menu")
                .setPlaceholder("Select an option / Selecione uma opção")
                .addOptions(
                    {label: "Services", description: "Tipo:Categoria", value: "services"},
                    {label: "Woofer", description: "Tipo:Categoria", value: "woofer"}
                )
        );

    await interaction.message.edit({ content: "Please choose an option:", components: [englishMenu] });

    // Aguarda a seleção da opção
    const filter = i => i.customId === 'english_menu' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
        const chosenOption = interaction.values[0];

        // Exibir mais opções dependendo da opção escolhida
        if (chosenOption === 'services') {
            // Menu de serviços em inglês
            await showEnglishServicesMenu(interaction);
        } else if (chosenOption === 'woofer') {
            // Menu de Woofer em inglês
            await showEnglishWooferMenu(interaction);
        }
    });
}

async function showPortugueseMenu(interaction) {
    const portugueseMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("portuguese_menu")
                .setPlaceholder("Selecione uma opção")
                .addOptions(
                    {label: "Serviços", description: "Tipo:Categoria", value: "services"},
                    {label: "Woofer", description: "Tipo:Categoria", value: "woofer"}
                )
        );

    await interaction.message.edit({ content: "```yaml\nPor favor, escolha uma opção:\n```", components: [portugueseMenu] });

    // Aguarda a seleção da opção
    const filter = i => i.customId === 'portuguese_menu' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
        const chosenOption = interaction.values[0];

        // Exibir mais opções dependendo da opção escolhida
        if (chosenOption === 'services') {
            // Menu de serviços em português
            await showPortugueseServicesMenu(interaction);
        } else if (chosenOption === 'woofer') {
            // Menu de Woofer em português
            await showPortugueseWooferMenu(interaction);
        }
    });
}

async function showEnglishServicesMenu(interaction) {
    // Implemente aqui o menu de serviços em inglês
    // Por exemplo:
    const englishServicesMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("english_services_menu")
                .setPlaceholder("Select a service / Selecione um serviço")
                .addOptions(
                    {label: "Service 1", description: "Tipo:Categoria", value: "service1"},
                    {label: "Service 2", description: "Tipo:Categoria", value: "service2"}
                )
        );

    await interaction.message.edit({ content: "Please choose a service:", components: [englishServicesMenu] });

    // Aguarda a seleção da opção
    const filter = i => i.customId === 'english_services_menu' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
        const chosenService = interaction.values[0];

        // Exibir opções de compra dependendo do serviço escolhido
        if (chosenService === 'service1') {
            // Menu de compra para o serviço 1 em inglês
            await showEnglishService1PurchaseMenu(interaction);
        } else if (chosenService === 'service2') {
            // Menu de compra para o serviço 2 em inglês
            await showEnglishService2PurchaseMenu(interaction);
        }
    });
}

async function showEnglishWooferMenu(interaction) {
    // Implemente aqui o menu de Woofer em inglês
    // Por exemplo:
    const englishWooferMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("english_woofer_menu")
                .setPlaceholder("Select a Woofer option / Selecione uma opção do Woofer")
                .addOptions(
                    {label: "Option 1", description: "Tipo:Categoria", value: "option1"},
                    {label: "Option 2", description: "Tipo:Categoria", value: "option2"}
                )
        );

    await interaction.message.edit({ content: "Please choose a Woofer option:", components: [englishWooferMenu] });
}

async function showPortugueseServicesMenu(interaction) {
    // Implemente aqui o menu de serviços em português
    // Por exemplo:
    const portugueseServicesMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("portuguese_services_menu")
                .setPlaceholder("Selecione um serviço")
                .addOptions(
                    {label: "League of Legends", description: "Tipo:Categoria", value: "leagueoflegends"},
                    {label: "Valorant", description: "Tipo:Categoria", value: "valorant"},
                    {label: "Counter-Strike 2", description: "Tipo:Categoria", value: "cs2"},
                    {label: "Fortnite", description: "Tipo:Categoria", value: "fortnite"},
                    {label: "Pubg", description: "Tipo:Categoria", value: "pubg"},
                )
        );

    await interaction.message.edit({ content: "Por favor, escolha um serviço:", components: [portugueseServicesMenu] });

    // Aguarda a seleção da opção
    const filter = i => i.customId === 'portuguese_services_menu' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
        const chosenService = interaction.values[0];

        // Exibir opções de compra dependendo do serviço escolhido
        if (chosenService === 'leagueoflegends') {
            // Menu de compra para League of Legends em português
            await showPortugueseLeagueOfLegendsPurchaseMenu(interaction);
        } else if (chosenService === 'valorant') {
            // Menu de compra para Valorant em português
            await showPortugueseValorantPurchaseMenu(interaction);
        }
        // Adicione mais opções de compra conforme necessário
    });
}

async function showPortugueseWooferMenu(interaction) {
    // Implemente aqui o menu de Woofer em português
    // Por exemplo:
    const portugueseWooferMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("portuguese_woofer_menu")
                .setPlaceholder("Selecione uma opção do Woofer")
                .addOptions(
                    {label: "Opção 1", description: "Tipo:Categoria", value: "option1"},
                    {label: "Opção 2", description: "Tipo:Categoria", value: "option2"}
                )
        );

    await interaction.message.edit({ content: "Por favor, escolha uma opção do Woofer:", components: [portugueseWooferMenu] });
}

async function showEnglishService1PurchaseMenu(interaction) {
    // Exemplo de menu de compra para o serviço 1 em inglês
    const englishService1PurchaseMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("english_service1_purchase_menu")
                .setPlaceholder("Select a plan / Selecione um plano")
                .addOptions(
                    {label: "Basic", description: "Tipo:Categoria", value: "basic"},
                    {label: "Premium", description: "Tipo:Categoria", value: "premium"}
                )
        );

    await interaction.message.edit({ content: "Please choose a purchase option for Service 1:", components: [englishService1PurchaseMenu] });
}

async function showEnglishService2PurchaseMenu(interaction) {
    // Exemplo de menu de compra para o serviço 2 em inglês
    const englishService2PurchaseMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("english_service2_purchase_menu")
                .setPlaceholder("Select a plan / Selecione um plano")
                .addOptions(
                    {label: "Basic", description: "Tipo:Categoria", value: "basic"},
                    {label: "Premium", description: "Tipo:Categoria", value: "premium"}
                )
        );

    await interaction.message.edit({ content: "Please choose a purchase option for Service 2:", components: [englishService2PurchaseMenu] });
}

async function showPortugueseLeagueOfLegendsPurchaseMenu(interaction) {
    // Exemplo de menu de compra para League of Legends em português
    const portugueseLeagueOfLegendsPurchaseMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("portuguese_lol_purchase_menu")
                .setPlaceholder("Selecione um plano")
                .addOptions(
                    {label: "Básico", description: "Tipo:Categoria", value: "basic"},
                    {label: "Premium", description: "Tipo:Categoria", value: "premium"}
                )
        );

    await interaction.message.edit({ content: "Por favor, escolha uma opção de compra para League of Legends:", components: [portugueseLeagueOfLegendsPurchaseMenu] });
}

async function showPortugueseValorantPurchaseMenu(interaction) {
    // Exemplo de menu de compra para Valorant em português
    const portugueseValorantPurchaseMenu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("portuguese_valorant_purchase_menu")
                .setPlaceholder("Selecione um plano")
                .addOptions(
                    {label: "Básico", description: "Tipo:Categoria", value: "basic"},
                    {label: "Premium", description: "Tipo:Categoria", value: "premium"}
                )
        );

    await interaction.message.edit({ content: "Por favor, escolha uma opção de compra para Valorant:", components: [portugueseValorantPurchaseMenu] });
}