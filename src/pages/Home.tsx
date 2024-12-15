import React, { useState, useEffect } from "react";




const IndexPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gray-900 w-full text-white py-6 px-4 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">{data.heading}</h1>
          <div>
            <a href="/login" className="ml-4 ">Login</a>
            <a href="/register" className="ml-4">Register</a>
          </div>
        </div>
      </header>

      <section className="relative w-full min-h-screen bg-gray-800 text-white">
  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center opacity-10"></div>


      {/* Main Content */}
      <main className="container relative grid grid-cols-2 z-10 h-screen mx-auto py-12">
        {data.contents.map((content: { id: number | null | undefined; image: string | undefined; title: string; description: string ; }) => (
          <div
            key={content.id}
            className="flex w-full md:flex-row items-center gap-6 mb-12"
          >
            <img
              src={content.image}
              alt={content.title}
              className="w-full md:w-1/3 rounded min-w-96 shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
              <p className="text-slate-100">{content.description}</p>
            </div>
          </div>
        ))}
      </main>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <img
            src={data.footer.logo}
            alt="Footer Logo"
            className="mx-auto mb-4 w-16"
          />
          <p className="text-sm">{data.footer.text}</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
