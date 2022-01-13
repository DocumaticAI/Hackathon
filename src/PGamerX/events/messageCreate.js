module.exports = (client, message) => {
  // Delcare Prefix
  const prefix = process.env.PREFIX;

  // Ignore all bots
  if (message.author.bot) return;
 
  // Ignore messages not starting with the prefix (in env)
  if (message.content.startsWith(prefix)){
  
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  // Grab the command data, check it and execute
  const cmd = client.message_commands.get(command);
  if (!cmd) return;
  cmd.execute(message, args);
  }
};
