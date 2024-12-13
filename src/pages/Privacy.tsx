import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/privacy");
        if (!response.ok) {
          throw new Error("Failed to fetch privacy policy data");
        }
        const data = await response.json();
        setPrivacyData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading privacy policy...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full mx-auto p-6 sm:p-10 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">Introduction</h2>
          <p>{privacyData.introduction}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
          <p>{privacyData.data_collection}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
          <p>{privacyData.data_usage}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
          <p>{privacyData.data_protection}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Third Party Sharing</h2>
          <p>{privacyData.third_party_sharing}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Retention</h2>
          <p>{privacyData.data_retention}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Cookie Policy</h2>
          <p>{privacyData.cookie_policy}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">User Rights</h2>
          <p>{privacyData.user_rights}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>{privacyData.contact_information}</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
