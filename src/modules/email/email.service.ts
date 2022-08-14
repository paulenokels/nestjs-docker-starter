import { Injectable } from '@nestjs/common';
var Mailgun = require('mailgun.js');
const formData = require('form-data');
var apiKey = '';
var domain = 'mg.ti5ive.com';
var from = '';
const url = '';

const mailgun = new Mailgun(formData);

type EmailData = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class EmailService {
  private sendMailgunMessage(data: EmailData) {
    var mg = mailgun.client({ username: 'api', key: apiKey, url });

    mg.messages
      .create(domain, data)
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));
  }

  public sendVerificationCode(receiver: string, code: string): string {
    var data = {
      from,
      to: receiver,
      subject: 'Links Verfication Code',
      html: `<div>Use <br /> <h3>${code}</h3> to verifify your email address. <p>Do not share this code with anyone</p></div>`,
    };
    this.sendMailgunMessage(data);
    return code;
  }

  public sendPasswordResetCode(receiver: string, code: string) {
    var data = {
      from,
      to: receiver,
      subject: 'Links Password Reset Code',
      html: `<div>Use <br /> <h3>${code}</h3> to reset your password on ti5ive. <p>Do not share this code with anyone</p></div>`,
    };
    this.sendMailgunMessage(data);
  }
}
