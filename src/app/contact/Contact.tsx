import { contactInfo, contactSection } from "@/constants/contact"

export default function Contact() {
  const handleSendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado");
  }
  return (
    <div>
      <h3 className="text-2xl font-semibold">{contactSection.title}</h3>
      <p className="text-gray-600 max-w-2xl mx-auto mt-4">
        {contactSection.description}
      </p>

      <div>
        <h3>Contacto</h3>
      </div>


      <h3 className="text-xl font-semibold mt-8">También puedes seguirnos en nuestras redes sociales:</h3>
      <div className="flex">
        <div className="mt-4">
          <a href={`https://www.instagram.com/${contactInfo.instagram.data}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 mb-2">
            <img src={contactInfo.instagram.logo} alt="Instagram" className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-2">
          <a href={`https://www.linkedin.com/in/${contactInfo.linkedin.data}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 mb-2">
            <img src={contactInfo.linkedin.logo} alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-2">
          <a href={`mailto:${contactInfo.email.data}`} className="flex items-center space-x-2 mb-2">
            <img src={contactInfo.email.logo} alt="Email" className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-2">
          <a href={`tel:${contactInfo.phone.data}`} className="flex items-center space-x-2 mb-2">
            <img src={contactInfo.phone.logo} alt="Phone" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}