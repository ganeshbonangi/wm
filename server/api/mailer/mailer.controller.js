'use strict';

var nodemailer = require('nodemailer');
var config = require('../../config/environment');
/**
 * Send mail to admin
 */
exports.sendMail = function (req, res, next) {
var transporter = nodemailer.createTransport({
    service: 'Gmail',//host:10.137.2.23
    auth:{
        user:'aapkisevame2015@gmail.com',
        pass:'ganesh@007'
    }
});
var mailerBody = "";
for (var prop in req.body.mailer) {
    console.log(prop);
    if(prop.indexOf("$")!=0 && req.body.mailer[prop])
        mailerBody += prop+": <b>"+req.body.mailer[prop]+"</b><br/>";;
}
/*if(req.body.mailer.name)
    mailerBody += "Name: <b>"+req.body.mailer.name+"</b><br/>";
if(req.body.mailer.mobile)
    mailerBody += "Mobile: <b>"+req.body.mailer.mobile+"</b><br/>";
if(req.body.mailer.mailId)
    mailerBody += "Email: <b>"+req.body.mailer.mailId+"</b><br/>";
if(req.body.mailer.message)
    mailerBody += "Message: <b>"+req.body.mailer.message+"</b><br/>";*/
var mailOptions = {
    from: 'aapkisevame2015@gmail.com', // sender address anjali.tiwari@ril.com
    to: 'ganesh.bonangi@gmail.com;prasadpvs123@yahoo.co.in;vivekvardhanvarma@live.com;', //// list of receivers abhishek.marathe4794@gmail.com  aapkisevame2015@gmail.com;jiomedia5@gmail.com;ganesh.bonangi@gmail.com;ganesh.bonangi@ril.com;ganesh.bonangi@gmail.com;
    subject: req.body.mailer.subject, // Subject line 
    //text: 'ganeis',  plaintext body 
    html: mailerBody
};
 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.json({code:200});
});
  
};

