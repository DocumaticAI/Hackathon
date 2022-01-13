module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    await interaction.deferReply();
  
    const command = client.slash_commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
}