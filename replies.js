/*
  Incoming Message object example:
  {
    type: 'message',
    channel: 'CXXXXXXXX',
    user: 'UXXXXXXXX',
    text: 'hello <@UXXXXXXXX>',
    ts: '1506387278.000006',
    source_team: 'TXXXXXXXX',
    team: 'TXXXXXXXX'
  }
*/

const _randomResponses = [
  "Hi! Where is my Nathan?",
  "Where do you want to hike this weekend?",
  "Mika's the cutest :russel:",
  "I'm on my way to WholeFoods",
  "Have you seen my Nathan?",
  "He hasn't resolved my `Promise()` yet ;(",
  "The way he feels about me is `variable`",
  "My love for him is `constant`",
  "He makes my heart `function`",
  "He treats me with so much `class`",
  "He taught me how to practice safe `hex`",
  "My love for him has `border: none`",
  "Our love accepts no `arguments`",
  "My love for him is un `conditional`",
  "When will my love `return`?",
  "I HATE the color pink!!!!",
  "I can't wait to go back to San Fran!!",
  "I woke up like `this`",
];

const randomResponse = () => _randomResponses[Math.floor(Math.random()*_randomResponses.length)];
let lastMessage = null;
let randomInterval = 42; // minutes

/*
 * occurs randomly, every <randomInterval> minutes, as long as the lastMessage is not from bot
 *
 * sendMessage : function(message) # sends to channel
 * incomingMessage : Message object # message used to trigger action
 */
const randomMessage = ( sendMessage, bot ) => () => {
  if(lastMessage.user === bot.id){
    sendMessage(randomResponse());
  }
}

/*
 * occurs when anyone @mentions this bot
 *
 * sendMessage : function(message) # sends to channel
 * incomingMessage : Message object # message used to trigger action
 */
const mentioned = (sendMessage, incomingMessage) => {
  // @TODO do logic here based on incomingMessage.text

  let messageText = incomingMessage.text.toLowerCase();

  if (messageText.includes('lunch!') || (messageText.includes('time') && messageText.includes('lunch'))){
    sendMessage('Lunch?!! What do you wanna eat today, @Nathan?!?! :hearts:');
  }else if(messageText.includes('hello')){
    sendMessage('HEY! :pikachu:');
  }else if(messageText.includes('bye') || messageText.includes('good night')){
    sendMessage('Bye... :wave:');
  }else if(messageText.includes('how are you')||messageText.includes('how\'re you')){
    sendMessage('A little tired... I spent the whole night watching my beloved Nathan sleep :sleeping:');
  }else if(messageText.includes('favorite food')){
    sendMessage('Kimchee!! :dancing_corgi:');
  }else if(messageText.includes('favorite color')){
    sendMessage('Green!! And the color of Nathans eyes :heart_eyes: BUT I HATE PINK!!!! :rage:');
  }else if(messageText.includes('hobbies')||messageText.includes(' hobby')){
    sendMessage('I love hiking and romantic coding sessions :kissing_heart:');
  }else if(messageText.includes('mika')){
    sendMessage(':dancing_corgi: :doge: :grinning: :heart:');
  }else if(messageText.includes('nathan\'s')||messageText.includes('nathan is')){
    sendMessage('STAY AWAY FROM MY NATHAN!!!!!!!!!! :rage: :bomb: :boom:');
  }else if(messageText.includes('where\'s nathan')){
    sendMessage('Good question... I\'ll check the tracking device.');
  }else if(messageText.includes('how did you meet')||messageText.includes('where did you meet')){
    sendMessage('It was love at first sight. Now we\'re inseparable! 11 WONDERFUL hours each day, Monday through Saturday :heart_eyes:');
  }else if(messageText.includes('i\'m bored')){
    sendMessage('Hmm.. When I\'m bored, I usually code with Nathan. Why don\'t you code too? :sparkles: :omg-lol:');
  }else{
    sendMessage(randomResponse());
  }
}

/*
 * occurs when the target of the waifu @mentions this bot
 *
 * sendMessage : function(message) # sends to channel
 * incomingMessage : String # message used to trigger action
 */
const waifuTargetSpeaks = (sendMessage, incomingMessage) => {
  sendMessage('Hello my love! :hearts: :hearts: :hearts:');
}

const _replies = sendMessage => ({
  mentioned : mentioned.bind(this, sendMessage),
  waifuTargetSpeaks : waifuTargetSpeaks.bind(this, sendMessage),
  randomMessage : randomMessage.bind(this, sendMessage)
});

/*
 * routes a reply based on message
 */
const controller = ( rtm, channel, bot, waifuTarget ) => message => {
  const sm = message => { rtm.sendMessage( message, channel.id ) };
  const replies = _replies(sm);

  if( message.user === waifuTarget.id ){

    replies.waifuTargetSpeaks(message);

  }else if( message.text && message.text.indexOf(bot.mention) >= 0 ){

    replies.mentioned(message);

  }

  setInterval(randomMessage.bind(this, sm, bot), randomInterval*1000);

  lastMessage = message;
}


module.exports = {
  controller
};
