import { aboutSection } from "@/constants/about"

export default function About() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mt-10">{aboutSection.title}</h2>
        <p className="text-gray-600">{aboutSection.content}</p>
      </div>
      

      <h3>Fundadores</h3>
      {aboutSection.founders.map((founder) => (
        <div key={founder.name} className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold">{founder.title}</h3>
          <div className="flex items-center mt-4">
            <img
              src={founder.imgUrl}
              alt={founder.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{founder.name}</p>
              <p className="text-gray-600">{founder.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}