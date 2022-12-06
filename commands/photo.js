const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const data = require('../data/negra.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('photo')
		.setDescription('Foto random de la negra'),
	async execute(interaction) {

		const url = data.urls[Math.floor(Math.random() * data.urls.length)];
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setImage(url);

		return interaction.reply({ embeds: [exampleEmbed] });
	},
};