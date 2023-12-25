import React, { useState, useEffect } from "react";
import { useCurrentDoctor } from "../context/doctor";

const FAQs = () => {
  const [faqsData, setFaqsData] = useState([]);

  const { currentDoctor } = useCurrentDoctor();

  useEffect(() => {
    console.log(currentDoctor);
    if (currentDoctor) setFaqsData(currentDoctor.faqs);
  }, [currentDoctor]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='text-center px-20 mt-20'>
      <h2 className='text-2xl font-bold mb-4'>FAQs</h2>
      {faqsData.map((faq, index) => (
        <div key={index} className='mb-4'>
          <div
            className='cursor-pointer flex items-center justify-between p-2 border border-gray hover:bg-yellow-green text-black'
            onClick={() => handleToggle(index)}
          >
            <span>{faq.question}</span>
            <span>{expandedIndex === index ? "-" : "+"}</span>
          </div>
          {expandedIndex === index && (
            <div className='p-2 bg-grey text-left'>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
