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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port} `));
