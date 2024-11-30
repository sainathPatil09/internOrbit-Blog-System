import React from "react";

const About = () => {
  return (
    <>
      <div className="bg-blue-50">
      <div className="h-1 bg-blue-500"></div>
        <div className="about-container md:w-3/4 mx-auto space-y-5 text-xl p-5">
          <h1 className="text-center text-5xl font-semibold">About Us</h1>
          <p className="about-description">
            Welcome to <span className="font-semibold text-xl"> cilli</span>
            <span className="text-blue-500 font-semibold text-xl">Blog</span>, a
            space where thoughts, ideas, and stories come to life. Our platform
            is designed to connect writers, readers, and communities through the
            power of words.
          </p>

          <section className="about-section">
            <h2 className="text-xl mb-4 bg-blue-500 text-white font-semibold w-fit px-2 py-1 rounded-lg">
              Who We Are
            </h2>
            <p>
              At <span className="brand-name">BlogApp</span>, we believe that
              everyone has a story to tell. Whether you're a seasoned writer or
              just starting out, our platform provides a simple and elegant way
              to share your thoughts and engage with like-minded readers.
            </p>
          </section>

          <section className="about-section">
            <h2 className="text-xl mb-4 bg-blue-500 text-white font-semibold w-fit px-2 py-1 rounded-lg">
              What We Offer
            </h2>
            <ul>
              <li>
                <strong>Write & Publish:</strong> Create stunning blog posts
                with our user-friendly editor.
              </li>
              <li>
                <strong>Explore & Discover:</strong> Browse through diverse
                categories like technology, travel, and lifestyle.
              </li>
              <li>
                <strong>Engage & Connect:</strong> Interact with writers through
                comments, likes, and shares.
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="text-xl mb-4 bg-blue-500 text-white font-semibold w-fit px-2 py-1 rounded-lg">
              Our Mission
            </h2>
            <p>
              To empower individuals to express themselves freely, connect with
              others, and inspire change through their stories and ideas.
            </p>
          </section>

          <div className="about-cta">
            <h2>Join Us!</h2>
            <p>
              Whether you're here to write or explore,{" "}
              <span className="brand-name">BlogApp</span> welcomes you to a
              world of creativity and connection.
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
