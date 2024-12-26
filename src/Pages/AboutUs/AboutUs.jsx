import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-20">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We are a passionate team dedicated to delivering the best solutions to help you reach your goals. Our platform
          enables users to rent games or lend their own games, creating a seamless gaming experience and community.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="mt-12 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Our mission is to empower gamers by offering a unique platform for renting and lending games. We strive to create a sustainable, affordable, and community-driven solution for gamers worldwide.
        </p>
      </div>

      {/* Values Section */}
      <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          We believe in fostering a community where gamers can connect, share, and support each other. Our values are rooted in sustainability, affordability, and accessibility, ensuring that everyone has the opportunity to enjoy their favorite games.
        </p>
      </div>

      {/* Community Engagement Section */}
      <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800">Community Engagement</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          We’re more than just a platform – we’re a community of passionate gamers who care about building a safe and enjoyable space for all. Our platform encourages collaboration, feedback, and connection among gamers, allowing for meaningful interactions that go beyond just renting or lending games.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Getting started on our platform is easy! Simply sign up, browse our collection of games, and choose the game you’d like to rent or lend. Whether you’re looking for the latest releases or classic favorites, our platform offers a wide variety to meet your gaming needs.
        </p>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
