import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const ContactUs = () => {
  return (<>

    <Navbar/>
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-20">
      {/* Contact Us Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or need support, reach out and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form and Details */}
      <div className="w-full px-4 md:px-0 md:w-2/3 lg:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded p-3 mt-1 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Get in Touch With Me</h3>
            <p className="mt-2 text-gray-600">Email: rsrohan787@gmail.com</p>
            <p className="text-gray-600">Phone: +91 90419 11113</p>
            <p className="text-gray-600">Address: 12 hno gali shruti de pichli side rohin de bed de nal</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;