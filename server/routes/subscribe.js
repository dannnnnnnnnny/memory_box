const express = require('express');
const router = express.Router();
const { Subscribe } = require("../models/Subscribe");

const { auth } = require("../middleware/auth");



//=================================
//             Subscribe
//=================================


// 구독자 수 확인
router.post("/subscribeNumber", (req, res)=> {
    
    Subscribe.find({ 'userTo': req.body.userTo })   // 비디오 작성자를 찾아서 나오는 객체 갯수
        .exec((err, subscribe)=> {
            if(err) 
                return res.status(400).send(err)
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

})

// 자신이 이 비디오를 구독했는지 확인
router.post("/subscribed", (req, res)=> {
    
    Subscribe.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
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


// 구독 중일 때 취소 버튼 클릭
router.post("/unSubscribe", (req, res)=> {
    
    Subscribe.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc)=> {
            if(err) 
                return res.status(400).json({ success: false, err })
            
            return res.status(200).json({ success: true, doc })
        })
})


// 구독 버튼 클릭
router.post("/subscribe", (req, res)=> {
    
    const subscribe = new Subscribe(req.body)

    subscribe.save((err, doc)=> {
        if(err)
            return res.status(400).json({ success: false, err })
        
        return res.status(200).json({ success: true, doc })
    })
})



module.exports = router;
