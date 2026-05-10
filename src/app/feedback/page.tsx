import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6">
          Client <span className="text-[#ffbb00]">Feedback</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Thank you for working with me! Please share your experience to help me improve my craft.
        </p>
      </div>

      <FeedbackForm />
    </main>
  );
}
