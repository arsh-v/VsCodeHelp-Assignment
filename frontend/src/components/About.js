import React from "react";
import { useCurrentDoctor } from "../context/doctor";
import axios from "axios";
import { DOCTORS_URL } from "../constants/urls";

const About = () => {
  const { currentDoctor, setCurrentDoctor } = useCurrentDoctor();
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DOCTORS_URL);
        setData(response.data);
        if (response.data.length > 0) {
          setCurrentDoctor(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!currentDoctor) {
      fetchData();
    }
  }, [currentDoctor, setCurrentDoctor]);
  if (!currentDoctor && !data) {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-4'>About</h2>
        <p className='text-lg mb-4'>Loading...</p>
      </div>
    );
  }

  if (!currentDoctor && data.length === 0) {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-4'>About</h2>
        <p className='text-lg mb-4'>No doctor found</p>
      </div>
    );
  }

  return (
    <div className='px-4 sm:px-20 mt-36'>
      <div className='bg-white border border-gray-300 rounded-md shadow-md p-8 mb-8 m-2'>
        <h2 className='text-2xl font-bold mb-4'>{currentDoctor.name}</h2>
        <p className='text-lg mb-4'>{currentDoctor.specialty}</p>

        <div className='mb-4'>
          <h3 className='text-xl font-bold mb-2'>Biography</h3>
          <p>
            {currentDoctor.biography}
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold mb-2'>Education</h3>
          {currentDoctor.education.length === 0 && (
            <p className='text-gray-500'>No education found</p>
          )}
          <ul>
            {currentDoctor.education.map((education, index) => (
              <li key={index}>{education}</li>
            ))}
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold mb-2'>Experience</h3>
          <p>{currentDoctor.experience} years</p>
        </div>
      </div>
    </div>
  );
};

export default About;
