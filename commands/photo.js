const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const data = require('../data/negra.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('photo')
		.setDescription('Foto random de la negra'),
	async execute(interaction) {

		console.log(data);
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Negra')
			.setDescription('Some description here')
			.setImage(data.urls.sample());

		return interaction.reply({ embeds: [exampleEmbed] });
	},
};