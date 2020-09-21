const express = require('express');
const router = express.Router();
const { Subscribe } = require("../models/Subscribe");

const { auth } = require("../middleware/auth");



//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res)=> {
    Subscribe.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe)=> {
            if(err) 
                return res.status(400).send(err)
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
})


router.post("/subscribed", (req, res)=> {
    
    Subscribe.find({ 'userTo': req.body.userTo, 'userFrom': req.body.usreFrom })
        .exec((err, subscribe) => { // subscribe가 하나라도 있다면 자신이 구독하고 있다는 것
            if(err) 
                return res.status(400).send(err);
          
            let result = false
            if (subscribe.length !== 0) {
                result = true
            }  
            res.status(200).json({ success: true, subscribed: result })
        })

})

module.exports = router;
