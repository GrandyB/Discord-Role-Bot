# Discord-Role-Bot
A Discord bot that will create/add/remove people from a role tied to which game they are playing.

# Backstory
I help manage a Rocket League community's Discord server - one day I sat down and wondered whether, instead of separating the user list by 'level' (admins are placed at the top, moderators underneath, bots underneath that, users underneath that..) we could instead try for a 'flat' structure. We are a community surrounding a game, so why shouldn't we shift focus to whether people are actually playing the game at any moment in time, so people can perhaps pair up with other players easier?

After a night of figuring out how discord.io manipulates roles (it's rather ucky as you can see), this bot was born.

# How did it do?
It's not perfect - infact, it can seem a little bit buggy (I have to remove a user from the currently playing group every so often - it's rare enough that it doesn't bother me enough to hunt the problem down). But we have enjoyed the flat structure on Discord, and although it hasn't made much difference to who plays with who, it's better than what we had before.

# State of the code
As mentioned above, it's not in a great - slightly spaghetti and not very extendable (but it does exactly what I needed it to do, and still does, so).

Feel free to fork it, change it, redistribute it how you wish etc - as of right now (March 12th 2017) I have no plans on developing this into something more robust, so have at it!

# Running it
1. Have nodejs installed, install 'discord.io' from node, as well as 'request'.
2. node rolebot.js
3. Realise that you need to change a bunch of defaults in the code!

There's a bunch of fields that need tailoring to which game you wish to target, which group to create/put users in, which server, and what the bot's token is.

 - **GAME_NAME** - e.g. "Rocket League"
 - **GROUP_NAME** - e.g. "Currently playing "+GAME_NAME
 - **MAIN_SERVER** - e.g. "185320586287775744" (get this by activating dev mode in Discord, then right clicking on server icon, copy ID)
 - **BOT_TOKEN** - e.g. ifasijf09f2jf290af9jf2f0j2_f2h092fh0af9hsa0sf (a long string token, given by Discord's application developer control panel

After those are in and you've got the bot authenticated on your server, you'll need to give it manage roles permission at the very least.

Hopefully it all works for you!
