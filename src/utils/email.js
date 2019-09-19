const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, donate) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `BabyShark <${process.env.EMAIL_FROM}>`;
    if (donate) {
      this.title = donate.title;
    }
  }

  createTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1. Render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../templates/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      title: this.title
    });

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3. Create transporter and send email
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Bem vindo a família BabyShark!');
  }

  async sendResetPassword() {
    await this.send('passwordReset', 'Seu token para resetar sua senha!');
  }

  async sendInterest() {
    await this.send('interest', 'Alguém se interessou pela sua doação!');
  }
};
