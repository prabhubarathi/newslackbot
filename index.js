const SlackBot = require('slackbots') ;
const axios = require('axios');
const authtoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2bXdhcmUuY29tOjRlYTE0N2ExLWVkNWQtNGE1OC05MjBlLThhNDMyZmFhMTA4YSIsImF6cCI6ImNzcF9wcmRfZ2F6X2ludGVybmFsX2NsaWVudF9pZCIsImRvbWFpbiI6InZtd2FyZS5jb20iLCJjb250ZXh0IjoiZjZjZmY1MjgtMTNjMC00ODBlLTgzOTctMDQ0NDk5ZjU2ZDI4IiwiaXNzIjoiaHR0cHM6Ly9nYXouY3NwLXZpZG0tcHJvZC5jb20iLCJwZXJtcyI6WyJleHRlcm5hbC9aRjh1YU5yY3dtdmtSX1l6Q2hQSmpOZ3dLTjhfL25zeDpjbG91ZF9zZXJ2aWNlX2FkbWluIiwiZXh0ZXJuYWwvWkY4dWFOcmN3bXZrUl9ZekNoUEpqTmd3S044Xy9uc3g6Y2xvdWRfc2VydmljZV9hdWRpdG9yIiwiZXh0ZXJuYWwvbzNlY2JzQXZqcHc2bG1MM2FsaUpYMjl6VmhFXy92a2U6c2VydmljZS11c2VyIiwiZXh0ZXJuYWwvN2NKMm5nU19oUkNZX2JJYld1Y000S1dRd09vXy9sb2ctaW50ZWxsaWdlbmNlOnVzZXIiLCJleHRlcm5hbC9Zdy1IeUJlUXpqQ1hrTDJ3UVNlR3dhdUotbUFfL2NhdGFsb2c6dXNlciIsImNzcDpvcmdfbWVtYmVyIiwiZXh0ZXJuYWwvWnk5MjRtRTNkd24yQVN5VlpSME5uN2x1cGVBXy9hdXRvbWF0aW9uc2VydmljZTp1c2VyIiwiZXh0ZXJuYWwvOXFqb05hZkRwOVhreXlRTGNMQ0tXUHNBaXIwXy92cm5pOmFkbWluIiwiZXh0ZXJuYWwvN2NKMm5nU19oUkNZX2JJYld1Y000S1dRd09vXy9sb2ctaW50ZWxsaWdlbmNlOmFkbWluIiwiZXh0ZXJuYWwvdWx2cXRONDE0MWJlQ1Qyb09uYmotd2xrekdnXy9Db2RlU3RyZWFtOmRldmVsb3BlciIsImV4dGVybmFsL1NvQ0QzMjZkWS10R0JzTGFKZjRBSEVzbmFXMF8vZGlzY292ZXJ5OnVzZXIiLCJleHRlcm5hbC9sR29ucl9sbkJIeXdxS1BuMzJROFVmMjJuallfL2Rpc2NvdmVyeTp1c2VyIl0sImNvbnRleHRfbmFtZSI6ImJmZDdhNzUxLWIyZjUtNDNhMy1iMmIzLTBjODJkNjg5NmFlZSIsImV4cCI6MTUzMjcyNjA5MywiaWF0IjoxNTMyNzI0MjkzLCJqdGkiOiJmMzk3MTA5OS1jM2VhLTQxMTktYTQwYi1mYWQ5OGJiNmE5YzIiLCJ1c2VybmFtZSI6InBiYXJhdGhpIn0.TxZgvi6qsyLdEkkOG6MQWyZFuET1qF-TXcvlAtXe_USWNX6ZU7bVgIQdfaWwKk_x2ffm17fFJXg3MRFlvjqC5TNu12SYue_c0AbqahJJvleXlqjTsPZ_eq-XqC0wrmK1M0sljaq1Oi1YYIxzhyB-GEQTk0xR6hJ3bwSLsQVZ7ychtekkD1F3S4xn49JH48zhnjOWLxFjv0GqK14zL13HQNb_a8fKlsfqIHogPpAwB2oTbg-OczPJW_uOIBcfHws66i0g8anEMICal2DFhFNXBQ-YJdPaD3b3qLpa3sFC1_u2YkX9CVK_AOXzCciqEOiHjEBhVTxNrc8ml5-0IAG9iQ'
var iplookup = require('iplookup')

const bot = new SlackBot ({
    token: 'xoxb-386509464003-401409504435-gNZiKPgqCEXoJwfDI9nniyAU' ,
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

function handleMessage(message) {

    if(message.includes(' chucknorris')) {
        chuckjoke();
    }

    if(message.includes(' namelookup')) {
        namelookup();
    }
    if(message.includes(' iplookup')) {
        iplookup();
    }
    if(message.includes(' createnewapp')){
        apptier();
    }
    if(message.includes(' iplookup')){
        iplookup();
    }

}

function chuckjoke() {
    axios.get ('http://api.icndb.com/jokes/random')
      .then(res => {
          const joke = res.data.value.joke;
          const params = {
            icon_emoji: ':laughing:'
        }
        bot.postMessageToChannel('general',`Chuck Norris: ${joke} `,params);
        }
    )
}

function iplookup() {

    iplookup.getInfo('173.194.72.94', function (ret) {
        bot.postMessageToChannel('general',`iplooku ${ret}`);
    }
    )
}


function namelookup() {
    var config = {
        headers: {'csp-auth-token': authtoken}
    };
    axios.get('https://www.mgmt.cloud.vmware.com/ni/api/ni/entities/vms/10202:601:1856511441', config)
        .then(res => {
            const entity1 = res.data.name;
        bot.postMessageToChannel('general',`${entity1}`);
    }
)
}

function iplookup() {
    var config = {
        headers: {
            'csp-auth-token': authtoken}
        };
    axios.post('https://www.mgmt.cloud.vmware.com/ni/api/ni/search', {
        entity_type: "EC2Instance",
        filter: "ip_addresses.ip_address = '172.100.1.215'"}, config)
        .then(res => {
            const iplookup = res.data.results[0].entity_id;
        bot.postMessageToChannel('general',"Your Object ID = "+`${iplookup}`);
        }
    )

}



