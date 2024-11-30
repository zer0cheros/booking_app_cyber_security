import React, { useState, useEffect } from "react";

const IndexPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://192.168.2.122:5000/") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <title>{data.title}</title>
      <header>
        <h1>{data.heading}</h1>
      </header>
      <section className="hero">
        <img src={data.hero.image} alt="Hero" />
        <p>{data.hero.text}</p>
      </section>
      <main>
        {data.contents.map((content) => (
          <div key={content.id}>
            <h2>{content.title}</h2>
            <img src={content.image} alt={content.title} />
            <p>{content.description}</p>
          </div>
        ))}
      </main>
      <footer>
        <img src={data.footer.logo} alt="Footer Logo" />
        <p>{data.footer.text}</p>
      </footer>
    </div>
  );
};

export default IndexPage;