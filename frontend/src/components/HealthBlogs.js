import React from 'react';

const HealthBlogs = () => {
  const blogsData = [
    {
      id : '1',
      image: 'https://d3t5ai5vcxyqte.cloudfront.net/media/plhnneikipvkysgrwcjvsmg.jpg',
      title: 'Genital Tract Infections',
      description: 'Genital tract infections are caused by bacteria, fungi, parasites, and viruses, these agents infect the reproductive parts or organs of the genital tract.'
    },
    {
      id : '2',
      image: 'https://d3t5ai5vcxyqte.cloudfront.net/media/mkxtcoc.jpg',
      title: 'Losing too much blood during periods? Watch out for these signs!',
      description: 'Watch out for these signs!'
    },
    {
      id : '3',
      image: 'https://d3t5ai5vcxyqte.cloudfront.net/media/rzjlegplwr.jpg',
      title: 'Non-stress Test',
      description: 'How important is it?'
    },
  ];

  return (
    <div className="container mx-auto px-20 mt-36">
      <div className="flex flex-wrap -mx-4">
        {blogsData.map((blog, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-md p-4">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 overflow-hidden line-clamp-3">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBlogs;
