import React, { useEffect, useState } from "react";

const TermsOfService = () => {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/terms");
        if (!response.ok) {
          throw new Error("Failed to fetch terms data");
        }
        const data = await response.json();
        setTermsData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading terms...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className=" mx-auto p-6 sm:p-10 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Terms of Service</h1>
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">Introduction</h2>
          <p>{termsData.introduction}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
          <p>{termsData.eligibility}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Account Responsibility</h2>
          <p>{termsData.account_responsibility}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Booking Policy</h2>
          <p>{termsData.booking_policy}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Payment Terms</h2>
          <p>{termsData.payment_terms}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Cancellation Policy</h2>
          <p>{termsData.cancellation_policy}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
          <p>
            {termsData.privacy_policy_link.replace(
              "[Insert Privacy Policy URL]",
              <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Prohibited Use</h2>
          <p>{termsData.prohibited_use}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Liability Limitation</h2>
          <p>{termsData.liability_limitation}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Modification of Terms</h2>
          <p>{termsData.modification_of_terms}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>{termsData.contact_information}</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
