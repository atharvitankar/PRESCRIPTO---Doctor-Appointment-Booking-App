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


