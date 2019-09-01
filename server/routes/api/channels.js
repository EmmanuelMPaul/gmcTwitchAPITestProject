const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
// get channels

const uri = "mongodb://localhost:27017";

router.get('/', async (req, res) => {
    const channels = await loadChannelCollection();
    res.send(await channels.find({}).toArray());
});

// add channel
router.post('/', async (req, res) => {
    const channels = await loadChannelCollection();
    await channels.insertOne({
        channel: req.body.channel,
        createdAt: new Date()
    });
    res.status(201).send();
});

// delete  channel
router.delete('/:id', async (req, res) => {
    const channels = await loadChannelCollection();
    await channels.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();

});

async function loadChannelCollection(){
    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('gmctwitch').collection('channels');
}

module.exports = router;
