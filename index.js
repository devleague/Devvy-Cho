const {
  RtmClient,
  CLIENT_EVENTS,
  RTM_EVENTS
} = require('@slack/client');
const {
  controller
} = require('./replies');

const bot_token = process.env.SLACK_BOT_TOKEN || '';
const channel_name = process.env.SLACK_CHANNEL || 'test-bots';
const waifu_target_name = process.env.WAIFU_TARGET || 'nathan';

const rtm = new RtmClient(bot_token);

let channel;
let waifuTarget;
let bot;
let respond;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  channel = rtmStartData.channels.find(c => c.is_member && c.name === channel_name) ||
            rtmStartData.groups.find(c => c.is_member && c.name === channel_name);

  waifuTarget = rtmStartData.users.find(u => u.name === waifu_target_name);
  bot = rtmStartData.self;
  bot.mention = `<@${bot.id}>`;
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, connected to channel ${channel.name}:${channel.id}`);
  // console.log(`Waifu Target ${JSON.stringify(waifuTarget)}`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel.id);
  respond = controller(rtm, channel, bot, waifuTarget);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  // console.log('Message:', message);
  respond(message);
});

rtm.start();
