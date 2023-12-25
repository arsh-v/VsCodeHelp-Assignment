import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="bg-gray-200 p-8 px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
              <span>+91 1010110100</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              <span>Doctors Association, Kalyan Naka, Rk Business Centre, Opp. Bopal Nagar, Maharashtra, 421302</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul>
              <li><a href="/about" className="text-blue-500">About Me</a></li>
              <li><a href="/health-blog" className="text-blue-500">Health Blog</a></li>
              <li><a href="/treatment" className="text-blue-500">Treatments</a></li>
              {/* <li><a href="/privacy-policy" className="text-blue-500">Privacy Policy</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-2">Our Treatments</h4>
            <ul>
              <li>High Risk Pregnancy</li>
              <li>Sexually Transmitted Diseases (STDs)</li>
              <li>Infertility</li>
              <li>Menopause</li>
              <li>Endometriosis</li>
              <li>Fibroid Treatment</li>
              <li>PCOS Care</li>
              <li>Intrauterine Insemination (IUI)</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
