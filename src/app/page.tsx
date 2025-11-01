import Contact from './contact/Contact';
import About from './about/About';
import Services from './services/Services';
import { homeSection } from '@/constants/home';
import { company } from '@/constants/general';

import './home.css'

export default function HomePage() {
  return (
    <section className="text-center space-y-6 mt-28 mx-10">
      <div className='flex'>
        <div>
          <h2 className="text-4xl font-bold">{company.name}</h2>
          <p className="text-lg text-gray-600">
            {homeSection.subtitle}
          </p>
        </div>

        <div>
          {company.description && (
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              {company.description}
            </p>
          )}
        </div>
      </div>
      
      
      <About />

      <Services />

      <Contact />

    </section>
  );
}
