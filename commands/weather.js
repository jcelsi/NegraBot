const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('Ciudad')
				.setRequired(true)),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};