import React from 'react'

const TopNiches = () => {

  const services = [
    {
      id: 1,
      service: "Software Development",
      src: "/icons/software-development.gif",
     
    },
    {
      id: 2,
      service: "Web Development",
      src: "/icons/web-development.gif",
      
    },
    {
      id: 3,
      service: "Cyber Security",
      src: "/icons/cybersecurity.gif",
      
    },
    {
      id: 4,
      service: "Cloud Computing",
      src: "/icons/cloud-computing.gif",
      
    },
    {
      id: 5,
      service: "DevOps",
      src: "/icons/devops.gif",
      
    },
    {
      id: 6,
      service: "Mobile App Development",
      src: "/icons/mobile-app-development.gif",
      
    },
  ];


  return (
    <section className="services">
      <h3>Explore by Categoires🌟</h3>
      <div className='card-container'>
        {
          services.map(service => {
            return (
              <div className='card' key={service.id}>
                  <img className='card-img' src={service.src} alt="card-img" />
                  <h4>{service.service}</h4>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default TopNiches
