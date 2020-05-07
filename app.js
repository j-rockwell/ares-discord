'use strict';

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

// Fires upon successful connection
client.on('ready', () => {
    client.user.setActivity("playares.com", { type : 'PLAYING' });
    console.log('Application is now active');
});

// Fires when a message is sent in the guild
client.on('message', message => {
    const channel = message.channel;

    if (parseSpamMention(message)) {
        return;
    }

    // Handles deleting any message that isn't 
    if (channel.name == 'verify') {
        if (message.content !== '!verify') {
            message.delete();
            return;
        }
    }

    // Handles processing the verification process
    if (message.content === '!verify') {
        verify(message);
    }
});

// Sends the welcome message to a new guild member
client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

    if (!welcomeChannel) {
        console.log('Unable to obtain the welcome channel');
        return;
    }

    welcome(member, welcomeChannel);
});

/**
 * Handles preventing mass mention spam @JohnFairFax
 * @param {*} member 
 * @param {*} message 
 */
function parseSpamMention(message) {
    const count = message.mentions.users.keyArray().length;

    if (count >= 3) {
        message.delete();
        message.reply('Your message was deleted because it mentioned too many users');
        return true;
    }

    return false;
}

/**
 * Handles sending a welcome notification to a new member
 * @param {*} member
 * @param {*} channel
 */
function welcome(member, channel) {
    const verifyChannel = channel.guild.roles.cache.find(r => r.name === 'Verified');

    if (!verifyChannel) {
        console.log('Unable to obtain the verify channel');
        return;
    }

    const embed = new MessageEmbed()
    .setTitle('Welcome to the Ares Community Discord, ' + member.displayName + '!')
    .setColor(0xff0000)
    .setDescription('Type `!verify` in the **#verify** channel to gain full access to this Discord');
    channel.send('<@' + member.id + '>');
    channel.send(embed);
}

/**
 * Handles the verification process for a new member
 * @param {*} message 
 */
function verify(message) {
    const role = message.guild.roles.cache.find(r => r.name === "Verified");
    const member = message.member;

    if (!role) {
        console.log('Unable to obtain the verified role');
        return;
    }

    message.delete();
    member.roles.add(role).catch(console.error);
    member.mes
}

client.login('NzA3NzcyNjEwODYzMzAwNjc4.XrNq1g.V8E3R69omk1f_CPZOJ1oSOBfD58');