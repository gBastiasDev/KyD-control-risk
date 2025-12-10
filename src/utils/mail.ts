import emailjs from "emailjs-com";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string,
) => {
  const templateParams = {
    subject_string: 'Contacto desde web - ' + name,
    name,
    email,
    phone,
    message
  };

  try {
    await emailjs.send(
      SERVICE_ID || '',
      TEMPLATE_ID || '',
      templateParams,
      PUBLIC_KEY || ''
    );
    return true;
  } catch (error) {
    return false;
  }
};
