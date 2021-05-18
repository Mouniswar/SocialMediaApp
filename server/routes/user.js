const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const async = require('async');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})


router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me',auth, async(req, res) => {
    res.send(req.user)
})

router.post('/users/logout',auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save()
        res.send()
        res.redirect('/')
    } catch(e) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async(req,res) => {
    console.log(Object.values(req.body));
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','city','state']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }
     try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save() 
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async(req, res) => {
    try {
        console.log(req.user._id);
        await User.findByIdAndRemove({_id: req.user.id});
        // await req.user.remove()
        res.send(req.user);

    } catch(e) {
        res.status(500).send(e)
    }
})


router.get('/me/home', auth, async (req,res) => {
    try {
        console.log(req.user._id);
        const friends = await User.find({_id: {$ne: req.user._id}}, {"name":1,"email":1,"city":1,"state":1});
        console.log(friends);
        res.send(friends)
    }
    catch(e) {
        res.status(400).send(e);
    }
})

// GET /me/search?city="Kadapa"
// GET /me/search?state="Ap"

router.get('/me/search',auth, async(req,res) => {
    console.log(req.query.value);
    try {
        for (const key in req.query) {
            const match = {};
            console.log(key, req.query[key]);
            // if(key === "city") {
            //     match.city = req.query[key];
            //     console.log(match);
            // }
            if(key === "city") {
                let value = req.query[key];
                console.log(value);
                const user = await User.find({$and: [{_id: {$ne: req.user._id} }, {"city": {$in: [value]}}]}, {"name":1,"email":1,"city":1,"state":1}) //}
                console.log(user);
                if(!user) {
                    throw new Error();
                }
                res.send(user);
            }

            
            
        }
    } catch(e) {
        res.status(500).send(e);
    }

    
})

router.patch('/me/friend/add', auth, async (req, res) => {
    console.log(Object.values(req.body));
     try {
        //  Below logic only stores the sentRequests information on sender side.
        const user = await User.findOne({_id:req.user._id});
        if(user) {
            console.log(user);
            const specials = user.sentRequests;
            specials.push({
                sentId: req.body.sentId
            })
            console.log(specials);
            await user.save();
            res.send(user);
        }else {
            throw new Error();
        }

        const receiverSideUser = await User.findOne({_id: req.body.sentId});
        if(receiverSideUser) {
            // console.log(`Received Side User is ${receiverSideUser}`);
            const updates = receiverSideUser.requests;
            // console.log(`Receiver: ${updates}`);
            updates.push({
                userId: req.user._id
            })
            console.log(updates);
            await receiverSideUser.save();
        }
        else {
            throw new Error();
        }
        
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/me/friend/accept',auth,(req,res) => {
    let response = [];
        
    async.parallel([
        // this function is updated for the receiver of the friend request when it is accepted
        function(callback) {
            if (req.body.senderId) {
                const user1 = User.updateOne({
                    '_id': req.user._id,
                    'friendsList.friendId': {$ne:req.body.senderId}
                },{
                    $push: {friendsList: {
                        friendId: req.body.senderId,
                    }},
                    $pull: {requests: {
                        userId: req.body.senderId,
                    }},
                    $inc: {totalRequest: -1}
                }, (err, count)=> {
                    callback(err, count);
                });

                response.concat(user1);
            }
        },
        // this function is updated for the sender of the friend request when it is accepted by the receiver	
        function(callback) {
            if (req.body.senderId) {
                const user2 = User.updateOne({
                    '_id': req.body.senderId,
                    'friendsList.friendId': {$ne:req.user._id}
                },{
                    $push: {friendsList: {
                        friendId: req.user._id,
                    }},
                    $pull: {sentRequests: {
                        sentId: req.user._id
                    }}
                }, (err, count)=> {
                    callback(err, count);
                });
                response.concat(user2);

            }

        }
    ])

    console.log(response);
    res.send(response)


})

module.exports = router;
 //const accept = await User.findOne({userId: {$in: req.body.userId}});
        
/* const accept = await User.findOne({'requests.userId': {$in: [req.body.userId]}});
console.log("Accept: ", accept); */