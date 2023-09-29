import { Injectable } from '@nestjs/common';
import transporter from './email.config';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: 'jahcjoseangel@gmail.com',
        to,
        subject,
        html,
      };

      await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new Error('No se pudo enviar el correo electrónico.');
    }
  }
}
