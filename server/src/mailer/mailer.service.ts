import { Resend } from 'resend';

export class MailerService {
  private readonly mailer: Resend;
  constructor() {
    this.mailer = new Resend(process.env.RESEND_API_KEY);
  }

  async sendCreateAccountEmail({
    recipient,
    firstName,
  }: {
    recipient: string;
    firstName: string;
  }) {
    try {
      const { data, error } = await this.mailer.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [recipient],
        subject: 'Bienvenue Chez Homemade! ',
        html: `<h1>Bonjour ${firstName} !</h1> <br> <p> Bienvenu sur Homemade ! <br> Prêts à partager vos meilleurs recettes ?</p>`,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    } catch (error) {
      console.log('Error in mail :' + error);
    }
  }

  async sendResetPasswordEmail({
    recipient,
    firstName,
    token,
  }: {
    recipient: string;
    firstName: string;
    token: string;
  }) {
    try {
      const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      const { data, error } = await this.mailer.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [recipient],
        subject: 'Réinitialiser mon mot de passe',
        html: `<h1>Bonjour ${firstName} !</h1> <br> <p> Vous souhaitez réinitialiser votre mot de passe, voici votre lien de réinitialisation de mot de passe :  <br> ${link} </p>`,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    } catch (error) {
      console.log('Error in mail :' + error);
    }
  }
}
