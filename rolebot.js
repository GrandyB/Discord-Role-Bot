/**
 * Discord "Role bot".
 * MIT License (found at https://github.com/GrandyB/Discord-Role-Bot/blob/master/LICENSE)
 * I hope you find some use from it.
 * -GrandyB
 */
const DISCORD = require("discord.io");
const FS = require("fs");
const REQUEST = require('request');

/** These are the fields to be given defaults. */
const GAME_NAME = "GAME_NAME";		// e.g. "Rocket League"
const GROUP_NAME = "GROUP_NAME";	// e.g. "Currently playing "+GAME_NAME
const MAIN_SERVER = "MAIN_SERVER";	// e.g. "185320586287775744" (the server that the bot is in)
const BOT_TOKEN = "BOT_TOKEN";		// e.g. f9f2jfaifjasf_ffihafhifa_asifhoaihfffasf (a long string, from the app dev board)

var groupID = "";


// "Fields"
var bot = new DISCORD.Client({
	token: botToken,
	autorun: true
});

/** Bot event: Called when a player joins/leaves/edits themselves (e.g. name or game). */
bot.on("presence", function(user, userID, status, game) {
	console.log("game: "+game);

	if(game == null) {
		removeRoleIfStoppedPlaying(userID);
	} else if(game.name == GAME_NAME){
		addRoleIfPlaying(userID);
	} 
});

bot.on('ready', function() {
	console.log(bot.username + " - (" + bot.id + ")");	

	// Purge the currently playing group
	purgeCurrentlyPlayingGroup();
});

/**
 * addRoleIfPlaying.
 * Adds the appropriate server role if the user's current game is Arms of Telos.
 * @param user
 * 		The user resolvable.
 */
function addRoleIfPlaying(user){
	console.log(user + " is playing "+GAME_NAME+"!");
	console.log("Add them to the '"+groupID+"' group");

	bot.addToRole({
		serverID: MAIN_SERVER,
		userID: user,
		roleID: groupID
	});
}

/**
 * removeRoleIfStoppedPlaying.
 * Removes the appropriate server role if the user is currently part of the playing group, but is infact not playing Arms of Telos.
 * @param user
 * 		The user resolvable.
 */
function removeRoleIfStoppedPlaying(user){
	console.log(user + " is not playing "+GAME_NAME+"!");
	
	bot.removeFromRole({
		serverID: MAIN_SERVER,
		userID: user,
		roleID: groupID
	});
		
}

/** Removes all members from the currently playing group. */
function purgeCurrentlyPlayingGroup() {
	var roles = bot.servers[MAIN_SERVER].roles;
	var keys = Object.keys(roles);
	var id = "";

	for(var i=0; i<keys.length; i++){
		if(roles[keys[i]].name == GROUP_NAME){
			bot.deleteRole({
				serverID: MAIN_SERVER,
				roleID: roles[keys[i]].id
			});
		}
	}

	bot.createRole(MAIN_SERVER, createGroup);
}

var createGroup = function (err, res) {
	console.log("GROUP CREATED");
	groupID = res.id;

	// The role is deleted and remade each boot, with these defaults:
	bot.editRole({
		serverID: MAIN_SERVER,
		roleID: res.id,
		name: GROUP_NAME,
    	hoist: true,		// Displays separately to other groups?
    	mentionable: true,
    	permissions: {},
    	position: 2			// This doesn't seem to work
	});

	updateCurrentlyPlayingGroup();
}


/** Runs through all server members and adds the playing role if applicable. */
function updateCurrentlyPlayingGroup() {
	var members = bot.servers[MAIN_SERVER].members;
	var ids = Object.keys(members);

	console.log("Updating new group.")

	for(var i=0; i<ids.length; i++){
		console.log(members[ids[i]]);

		console.log("Game for member's user: "+bot.users[ids[i]].game);
		var game = bot.users[ids[i]].game;
		if(game != null && game.name == GAME_NAME){
			addRoleIfPlaying(members[ids[i]].id);
		}
	}
}