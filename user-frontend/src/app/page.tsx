// src/app/page.tsx
export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-green-50 rounded-2xl p-8 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900">
            Fresh groceries, <br />
            <span className="text-green-600">Delivered Safely.</span>
          </h1>
          <p className="text-gray-600 max-w-md">
            Order straight from your phone. We ensure the highest quality checks before it reaches your doorstep.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
        {/* Placeholder for Hero Image */}
        <div className="mt-6 md:mt-0 w-full md:w-1/2 h-64 bg-green-200 rounded-xl flex items-center justify-center">
          [Image Placeholder]
        </div>
      </section>

      {/* Dummy content to force scrolling */}
      <h2 className="text-2xl font-bold">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border hover:border-green-500 transition">
            Category {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}