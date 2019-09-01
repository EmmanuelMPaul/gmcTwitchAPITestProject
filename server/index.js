const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const channels = require('./routes/api/channels');
const schedule = require('node-schedule');

const updateChannelsData = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('Twitch call at '+ (new Date()));
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/channels', channels);
//handle production
if(process.env.NODE_ENV == 'production'){
    //static folder
    app.use(express.static(__dirname + '/public'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port} `));
