import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jahcjoseangel@gmail.com',
    pass: 'qvvk qddu buqc umgm',
  },
});

export default transporter;