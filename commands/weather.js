const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tiempo')
		.setDescription('Entrega el clima de la ciudad indicada')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('Ciudad')
				.setRequired(true)),
	async execute(interaction) {
		return interaction.reply('Clima!');
	},
};