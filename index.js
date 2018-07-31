const SlackBot = require('slackbots') ;
const axios = require('axios');
const authtoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bXdhcmUuY29tOjRlYTE0N2ExLWVkNWQtNGE1OC05MjBlLThhNDMyZmFhMTA4YSIsImF6cCI6ImNzcF9wcmRfZ2F6X2ludGVybmFsX2NsaWVudF9pZCIsImRvbWFpbiI6InZtd2FyZS5jb20iLCJjb250ZXh0IjoiZjZjZmY1MjgtMTNjMC00ODBlLTgzOTctMDQ0NDk5ZjU2ZDI4IiwiaXNzIjoiaHR0cHM6Ly9nYXouY3NwLXZpZG0tcHJvZC5jb20iLCJwZXJtcyI6WyJleHRlcm5hbC9aRjh1YU5yY3dtdmtSX1l6Q2hQSmpOZ3dLTjhfL25zeDpjbG91ZF9zZXJ2aWNlX2FkbWluIiwiZXh0ZXJuYWwvWkY4dWFOcmN3bXZrUl9ZekNoUEpqTmd3S044Xy9uc3g6Y2xvdWRfc2VydmljZV9hdWRpdG9yIiwiZXh0ZXJuYWwvbzNlY2JzQXZqcHc2bG1MM2FsaUpYMjl6VmhFXy92a2U6c2VydmljZS11c2VyIiwiZXh0ZXJuYWwvN2NKMm5nU19oUkNZX2JJYld1Y000S1dRd09vXy9sb2ctaW50ZWxsaWdlbmNlOnVzZXIiLCJleHRlcm5hbC9Zdy1IeUJlUXpqQ1hrTDJ3UVNlR3dhdUotbUFfL2NhdGFsb2c6dXNlciIsImNzcDpvcmdfbWVtYmVyIiwiZXh0ZXJuYWwvWnk5MjRtRTNkd24yQVN5VlpSME5uN2x1cGVBXy9hdXRvbWF0aW9uc2VydmljZTp1c2VyIiwiZXh0ZXJuYWwvOXFqb05hZkRwOVhreXlRTGNMQ0tXUHNBaXIwXy92cm5pOmFkbWluIiwiZXh0ZXJuYWwvN2NKMm5nU19oUkNZX2JJYld1Y000S1dRd09vXy9sb2ctaW50ZWxsaWdlbmNlOmFkbWluIiwiZXh0ZXJuYWwvdWx2cXRONDE0MWJlQ1Qyb09uYmotd2xrekdnXy9Db2RlU3RyZWFtOmRldmVsb3BlciIsImV4dGVybmFsL1NvQ0QzMjZkWS10R0JzTGFKZjRBSEVzbmFXMF8vZGlzY292ZXJ5OnVzZXIiLCJleHRlcm5hbC9sR29ucl9sbkJIeXdxS1BuMzJROFVmMjJuallfL2Rpc2NvdmVyeTp1c2VyIl0sImNvbnRleHRfbmFtZSI6ImJmZDdhNzUxLWIyZjUtNDNhMy1iMmIzLTBjODJkNjg5NmFlZSIsImV4cCI6MTUzMzA0NjE1MSwiaWF0IjoxNTMzMDQ0MzUxLCJqdGkiOiI0OTkwMjQ1Ni1kY2EwLTQ5ZjAtYjY4OC01NTU0ZGEwMDc3MDQiLCJ1c2VybmFtZSI6InBiYXJhdGhpIn0.MDlWN11kwGkXfVn6Vh4iJgaKsLgM-eiYFt7m28pLMkTD59JYTXHgtUynTjeZv_AuutrnxDpqUKk92fYBtnscyXTkuSabsW7askfkmipOMPeaOd1mp-Wui3dyiDm5i25u7CmFl2NGXRInooy5CqkCZZ4MOzz8qfAuiBsqLaH-9Jg2jkI4Xlmh4gP8QeyttXcC7rBC--ofABBRNbcYW0dfFgzNZFDcoQKIG9_k_4ofU0kGEmjRREbkwOpY7hUlJu_Azpj3NAuyJitmQO00-dXoIu_XmzeoZ64cs4kYQES5h3zfC5U9mF2TWDfBc8FW0GuogOsHVeLAqyHfB08uIl2EIA'

const entitytype = "EC2Instance";

var Botkit = require('botkit')
var Witbot = require('witbot')
var request = require ('request')

var witToken = 'PQNONQM2GYW2CJNHWZ2YULIJE2ZGHXRC'
var slackToken = 'xoxb-386509464003-401409504435-gNZiKPgqCEXoJwfDI9nniyAU'

var witbot = Witbot(witToken)   

var controller = Botkit.slackbot({
    debug: false
})

const bot = new SlackBot ({
    token: slackToken ,
    name: 'jarvis'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }
    bot.postMessageToChannel('general','Hey there, Jarvis Here! What can i do?',params);
}

);

bot.on('error',err => console.log(err));

bot.on ('message', data => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text)
});

//connecting into slack

controller.spawn({ token: slackToken }).startRTM(function (err, bot, payload) {
    if (err) throw new Error('Error connecting to Slack: ', err)
    console.log('Connected to Slack')
  }) 

// wire up DMs and direct mentions to 

controller.hears('chuck norris','direct_message,direct_mention', function chuckjoke() {
    axios.get ('http://api.icndb.com/jokes/random')
      .then(res => {
          const joke = res.data.value.joke;
          const params = {
            icon_emoji: ':laughing:'
        }
        bot.postMessageToChannel('general',`Chuck Norris: ${joke} `,params)
        }
    )
})

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        console.log(message)
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});



controller.hears(['who is IP address (.*)', 'find IP address (.*)'], 'direct_message,direct_mention,mention', function (bot,message) {
    var ipadd = message.match[1];
    var config = {
        headers: {
            'csp-auth-token': authtoken}
        };

    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.ipadd = ipadd;
        console.log (message)
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will lookup ' + user.ipadd + ' for you.');
            
            axios.post ('https://www.mgmt.cloud.vmware.com/ni/api/ni/search', {

                entity_type: entitytype,
                filter: "ip_addresses.ip_address =" +`${ipadd}`}, config)
                .then(res => {
                    const user_entity = res.data.results[0].entity_id;
                bot.reply(message, 'Your Entity ID in Network Insight is' + user_entity)  
                
            axios.get ('https://www.mgmt.cloud.vmware.com/ni/api/ni/entities/vms/'+`${user_entity}`, config )
                .then (res => {
                    const instance_name = res.data.name
                    console.log(instance_name)
                    bot.reply (message, 'Your Instance Name in AWS is ' + instance_name ) 
                }
                
                )

        }    
    )      
        
        });
    });
});


controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}



controller.hears(['pizzatime'],['ambient','direct_message'],function(bot,message) {
    bot.startConversation(message, askFlavor);
  })
  
  askFlavor = function(response, convo) {
    convo.ask("What flavor of pizza do you want?", function(response, convo) {
      convo.say("Awesome.");
      askSize(response, convo);
      convo.next();
    });
  }
  askSize = function(response, convo) {
    convo.ask("What size do you want?", function(response, convo) {
      convo.say("Ok.")
      askWhereDeliver(response, convo);
      convo.next();
    });
  }
  askWhereDeliver = function(response, convo) { 
    convo.ask("So where do you want it delivered?", function(response, convo) {
      convo.say("Ok! Goodbye.");
      convo.next();
    });
  }

function handleMessage() {
}
