const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('partido-mundial')
		.setDescription('Devuelve fechas de partidos')
		.addStringOption(option =>
			option.setName('fecha')
				.setDescription('Dia de los partidos.')),
	async execute(interaction) {
		const current_date = new Date();
		const year = current_date.getFullYear();
		const month = current_date.getMonth() + 1;
		const day = current_date.getDate();
		let dateWithHyphens;
		let reply = '';

		switch (interaction.options.getString('fecha')) {
		case 'hoy':
			reply = 'Los partidos para hoy son:\n';
			dateWithHyphens = [year, month, '0' + day].join('-');
			break;
		case null:
			reply = 'Los partidos para hoy son:\n';
			dateWithHyphens = [year, month, '0' + day].join('-');
			break;
		case 'mañana':
			reply = 'Los partidos para mañana son:\n';
			dateWithHyphens = [year, month, '0' + (day + 1)].join('-');
			break;
		default:
			// eslint-disable-next-line no-case-declarations
			const userDate = interaction.options.getString('fecha').split(' ');
			reply = `Los partidos para el ${userDate[0]} ${userDate[1]} son:\n`;
			dateWithHyphens = [year, month, '0' + userDate[1]].join('-');
			break;
		}

		const config = {
			headers: { 'X-Auth-Token': process.env.FOOTBALL_TOKEN, 'Accept-Encoding': 'application/json' },
		};

		await interaction.deferReply();

		await axios.get(`https://api.football-data.org/v4/competitions/WC/matches?dateFrom=${dateWithHyphens}&dateTo=${dateWithHyphens}`, config)
			.then((response) => {
				for (const match of response.data.matches) {
					const homeTeam = match.homeTeam.name;
					const awayTeam = match.awayTeam.name;
					if (match.status == 'FINISHED') {
						const teams = `${homeTeam} vs ${awayTeam}`;
						reply += teams + `   (${match.score.fullTime.home}-${match.score.fullTime.away})\n`;
					}
					else {
						const teams = `${homeTeam} vs ${awayTeam}`;
						reply += teams + '\n';
					}
				}
				return interaction.editReply(reply);
			})
			.catch(error => {
				return interaction.editReply('```ansi\n No hay partidos para la fecha ```');
			});
	},
};