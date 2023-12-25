import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBaby, faStethoscope, faMedkit, faUserMd, faHospital, faVirus, faHourglass, faVenusMars, faHourglassEnd, faMicroscope, faBabyCarriage, faFemale } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Treatment = () => {
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
    {
      to: "/menopause",
      icon: faHourglassEnd,
      color: "text-orange-500",
      title: "Menopause",
      description: "Support and management during menopause",
    },
    {
      to: "/endometriosis",
      icon: faMicroscope,
      color: "text-teal-500",
      title: "Endometriosis",
      description: "Advanced care for endometriosis",
    },
    {
      to: "/fibroid-treatment",
      icon: faBabyCarriage,
      color: "text-pink-500",
      title: "Fibroid Treatment",
      description: "Personalized treatment for fibroids",
    },
    {
      to: "/pcos-care",
      icon: faFemale,
      color: "text-purple-500",
      title: "PCOS Care",
      description: "Comprehensive care for PCOS",
    },
    {
      to: "/iui",
      icon: faVenusMars,
      color: "text-blue-500",
      title: "Intrauterine Insemination (IUI)",
      description: "Assisted conception with IUI",
    },
  ];

  return (
    <div className="px-4 sm:px-20 flex justify-center items-center h-full mt-36">
      <div className="flex justify-left mt-4 flex-wrap">
        {treatmentCategories.map((category, index) => (
          <Link key={index} to={category.to} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2">
            <div className="w-full h-56 bg-white border border-gray-300 rounded-md shadow-md p-10 mb-4 flex flex-col items-center mt-3 hover:shadow-lg">
              <FontAwesomeIcon icon={category.icon} className={`${category.color} text-3xl mb-1`} />
              <p className="text-lg font-bold mb-2 text-center">{category.title}</p>
              <p className="text-center">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Treatment;
