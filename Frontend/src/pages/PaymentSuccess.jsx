import React, { useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate invoice after successful payment
  const handleGenerateInvoice = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/api/user/payment-invoice", {
        customerEmail: email,
        amount: Number(amount), // Convert amount to number
        description: "Payment for services",
      });

      setInvoiceUrl(response.data.invoiceUrl); // Hosted invoice URL
      setTransactionId(response.data.transactionId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  };

  // Download the invoice PDF
  const handleDownloadInvoice = () => {
    if (invoiceUrl) {
      const link = document.createElement("a");
      link.href = `${invoiceUrl}.pdf`; // Stripe typically appends ".pdf" for download
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      
      {/* Email input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-3 py-2 border rounded"
      />
      
      {/* Amount input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 px-3 py-2 border rounded"
      />
      
      {/* Generate Invoice button */}
      <button
        onClick={handleGenerateInvoice}
        className={`mt-6 px-4 py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Invoice"}
      </button>

      {/* Display Invoice Information */}
      {invoiceUrl && (
        <div className="mt-4">
          <p className="text-gray-700">Transaction ID: {transactionId}</p>
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Invoice
          </a>
          <button
            onClick={handleDownloadInvoice}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download Invoice
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PaymentSuccess;
