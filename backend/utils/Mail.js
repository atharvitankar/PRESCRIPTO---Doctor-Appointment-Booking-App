import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atharv.itankar02@gmail.com',
    pass: 'ixztnxqllmzxhxqv'
  }
});

export function sendMail(to,sub,msg){
    return transporter.sendMail({
        to: to,
        subject:sub,
        text: msg
    })
};





// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Appointment status',
//   text: 'Your appointment is confirmed.'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });