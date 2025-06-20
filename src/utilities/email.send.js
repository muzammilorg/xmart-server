import { transporter } from "../config/mail.config.js";
import Constants from "../constants.js";


async function sendMail({email=[], subject="", htmlTemplate = ""}) {
    
    const info = await transporter.sendMail({
      from: Constants.EMAIL_FROM,
      to: email.join(', '), 
      subject,
      html: htmlTemplate
    }); 

    return info
}

export default sendMail;