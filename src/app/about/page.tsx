import { aboutSection } from "@/constants/about"

export default function About() {
  return (
    <div className="mt-32">      
      {aboutSection.team.map((member) => (
        <div key={member.name} className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold">{member.title}</h3>
          <div className="flex items-center mt-4">
            <img
              src={member.imgUrl}
              alt={member.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}