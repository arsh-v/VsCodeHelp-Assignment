import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faBaby,
  faStethoscope,
  faMedkit,
  faUserMd,
  faHospital,
  faVirus,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import axios from "axios";
import { DOCTORS_URL } from "../constants/urls";
import { useCurrentDoctor } from "../context/doctor";

const Home = () => {
  const treatmentCategories = [
    {
      to: "/high-risk-pregnancy",
      icon: faHeart,
      color: "text-red-500",
      title: "High Risk Pregnancy",
      description: "Make your pregnancy journey smoother",
    },
    {
      to: "/prenatal-care",
      icon: faBaby,
      color: "text-blue-500",
      title: "Prenatal Care",
      description: "Ensuring the best care for you and your baby",
    },
    {
      to: "/cardiology",
      icon: faStethoscope,
      color: "text-green-500",
      title: "Cardiology",
      description: "Comprehensive heart care",
    },
    {
      to: "/emergency-medicine",
      icon: faMedkit,
      color: "text-orange-500",
      title: "Emergency Medicine",
      description: "Swift and effective emergency care",
    },
    {
      to: "/family-medicine",
      icon: faUserMd,
      color: "text-purple-500",
      title: "Family Medicine",
      description: "Comprehensive care for the whole family",
    },
    {
      to: "/general-surgery",
      icon: faHospital,
      color: "text-indigo-500",
      title: "General Surgery",
      description: "Expert surgical interventions",
    },
    {
      to: "/stds",
      icon: faVirus,
      color: "text-pink-500",
      title: "Sexually Transmitted Diseases (STDs)",
      description: "Comprehensive care for STDs",
    },
    {
      to: "/infertility",
      icon: faHourglass,
      color: "text-yellow-500",
      title: "Infertility",
      description: "Specialized treatments for infertility",
    },
  ];

  const [data, setData] = React.useState([]);
  const { currentDoctor, setCurrentDoctor } = useCurrentDoctor();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DOCTORS_URL);
        setData(response.data);
        if (response.data.length > 0 && !currentDoctor) {
          setCurrentDoctor(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setCurrentDoctor]);

  const sliderItems = [
    {
      name: "Arsh verma",
      specialization: "kuch to kiya hai",
      education: "MBBS ig",
      imageSrc:
        "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75",
      altText: "Alt Text 1",
      clinicAddress: "Hey I am here for now!!",
    },
    {
      name: "Aman Kumar",
      specialization: "kuch to kiya hai",
      education: "MBBS ig",
      imageSrc:
        "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75",
      altText: "Alt Text 2",
      clinicAddress: "Hey I am here for now!!",
    },
    {
      name: "Rahul Verma",
      specialization: "kuch to kiya hai",
      education: "MBBS ig",
      imageSrc:
        "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75",
      altText: "Alt Text 2",
      clinicAddress: "Hey I am here for now!!",
    },
    {
      name: "Deepika Verma",
      specialization: "kuch to kiya hai",
      education: "MBBS ig",
      imageSrc:
        "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75",
      altText: "Alt Text 2",
      clinicAddress: "Hey I am here for now!!",
    },
    {
      name: "Yask Malik",
      specialization: "kuch to kiya hai",
      education: "MBBS ig",
      imageSrc:
        "https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Ffemale_doctor.jpg&w=256&q=75",
      altText: "Alt Text 2",
      clinicAddress: "Hey I am here for now!!",
    },
    // Add more items as needed
  ];

  if (!data) {
    return (
      <div className='mt-12 pt-12'>
        <center>
          <h1 className='text-2xl font-bold'>Loading...</h1>
        </center>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mt-12 pt-12">
        <center>
          <h1 className="text-2xl font-bold">No doctors available</h1>
        </center>
      </div>
    );
  }

  return (
    <div className='p-8 mt-10 md:mt-20'>
      <Slider items={data} />
      {/* About */}
      <div className='flex flex-col md:flex-row items-center justify-between mt-36'>
        <div className=' w-full md:w-80 ml-0 md:ml-10 mb-8'>
          <div className='text-4xl font-bold mb-4 mx-2 md:mx-10'>About Me</div>
          <p className='text-lg mx-2 md:mx-10'>
            {/* Provide your description here */}
            {currentDoctor.biography.substring(0, 200) +
              (currentDoctor.biography.length > 200 ? "..." : "")}
            <Link to='/about' className='text-blue-600 font-medium'>
              Read more
            </Link>
          </p>
          <Link
            to='/book-appointment'
            className='text-green-500 text-center p-2 rounded mt-4 border border-green-500 block mx-2 md:mx-10'
          >
            Book Appointment
          </Link>
        </div>
        <div className='flex-shrink-0 mr-20'>
          <img
            src='https://drmanikdalvi.getmy.clinic/_next/image?url=%2Fimages%2Fabout_hospital.jpg&w=640&q=75'
            alt='Dr. Manik Dalvi'
            className='w-full md:w-96 h-96 rounded-md object-cover'
          />
        </div>
      </div>

      {/* Services */}
      <h1 className='px-20 mt-20 font-bold text-3xl'>Treatments</h1>
      <div className='px-4 sm:px-20 flex justify-center items-center h-full mt-4'>
        <div className='flex justify-left mt-4 flex-wrap'>
          {treatmentCategories.map((category, index) => (
            <Link
              key={index}
              to={category.to}
              className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2'
            >
              <div className='w-full h-56 bg-white border border-gray-300 rounded-md shadow-md p-10 mb-4 flex flex-col items-center mt-3 hover:shadow-lg'>
                <FontAwesomeIcon
                  icon={category.icon}
                  className={`${category.color} text-3xl mb-1`}
                />
                <p className='text-lg font-bold mb-2 text-center'>
                  {category.title}
                </p>
                <p className='text-center'>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex justify-center'>
        <Link to='/treatment' className='text-blue-400 font-medium'>
          <button className='p-2 border-2 border-blue-400 rounded-md'>
            VIEW MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
