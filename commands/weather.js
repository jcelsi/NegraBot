const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tiempo')
		.setDescription('Entrega el clima de la ciudad indicada')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('Ciudad')
				.setRequired(true)),
	async execute(interaction) {

		let city = interaction.options.getString('city');
		city = city.charAt(0).toUpperCase() + city.slice(1);
		city = city == 'Santiago' ? 'Santiago, Chile' : city;

		await interaction.deferReply();

		const config = {
			headers: { 'Accept': '*/*', 'User-Agent': 'curl/7.43.0', 'Accept-Language': 'es-ES' },
		};

		await axios.get(`http://wttr.in/${city}?m`, config)
			.then((response) => {
				const raw = response.data.split('\n');
				const idx = raw.findIndex(el => /\s+┌─────────────┐\s+/.test(el));
				const result = raw
					.slice(0, idx)
					.map(text => text.replace(/\[(\d+)?((;\d+)+)?(m)?/g, ''))
					.join('\n')
					.replaceAll('\x1B', '');

				return interaction.editReply('```ansi\n' + result + '\n```');
			})
			.catch(error => {
				return interaction.editReply('```ansi\n Ciudad no encontrada ```');
			});
	},
};