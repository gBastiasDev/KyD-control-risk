import { servicesSection } from '@/constants/services'

export default function Services() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">{servicesSection.title}</h2>
      <p className="text-gray-600">{servicesSection.description}</p>

      {servicesSection.services.map((service) => (
        <div key={service.name} className="border p-4 rounded-lg shadow-md mb-4">
          <img src={service.imgUrl} alt={service.name} className="w-16 h-16 mb-2" />
          <h3 className="text-xl font-bold">{service.name}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  )
}
