var express = require('express');
var router = express.Router();
var md = require('md5')
var user = require("../model/user")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { exist: false, empty: false });
});

router.post('/', function(req, res, next) {
    console.log(req.body)

    user.find({ email: req.body.email }).then((result) => {
        //console.log(res)
        if (result.length == 0) {
            return user.create({
                name: req.body.name,
                email: req.body.email,
                password: md(req.body.password)

            })
        } else {


            return res.render('register', { exist: true, empty: false })
        }

    }).then((result) => {
        console.log(result)
        return res.redirect("login");

    }, (resolve) => {
        res.render('register', { exist: false, empty: true })
    })



});




module.exports = router;