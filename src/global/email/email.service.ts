import { Injectable } from '@nestjs/common';
import transporter from './email.config';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, token: string) {
    try {
      const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Correo Electrónico</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  color: #333;
              }
      
              p {
                  color: #555;
              }
      
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
      
              .button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Bienvenido a Encarguitos</h1>
              <p>Bienvenido a nuestra plataforma de Ventas y Administración. ¡Únete ahora!</p>
              <a href="http://localhost:3000/users/active/${token}" class="button">Verificar Correo</a>
          </div>
      </body>
      </html>
      `;
      const mailOptions = {
        from: 'jahcjoseangel@gmail.com',
        to,
        subject,
        html,
      };
      Promise.resolve(await transporter.sendMail(mailOptions));
      console.log('Correo electrónico enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new Error('No se pudo enviar el correo electrónico.');
    }
  }
}
