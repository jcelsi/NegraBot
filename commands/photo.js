const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const data = require('../data/negra.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('photo')
		.setDescription('Foto random de la negra'),
	async execute(interaction) {
		await interaction.deferReply();

		await axios.get('http://api.kanye.rest')
			.then((response) => {
				const url = data.urls[Math.floor(Math.random() * data.urls.length)];
				const exampleEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.addFields(
						{ name: 'Negra says', value: response.data.quote },
					)
					.setImage(url);
				return interaction.editReply({ embeds: [exampleEmbed] });
			})
			.catch(error => {
				return interaction.editReply(`${error}`);
			});
	},
};