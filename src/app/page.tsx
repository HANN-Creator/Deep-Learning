import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  { id: 1, title: '콜롬비아 수프리모 후일라', image: '/cosiness.png', price: 18, topPick: false },
  { id: 2, title: '스타 블랜드 골드', image: '/intensity.png', price: 14, topPick: false },
  { id: 3, title: '홀릭 스틱 콜드브루', image: '/passion.png', price: 15, topPick: true },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FADDE6] flex flex-col items-center py-8">
      {/* Top Floral Bar */}
      <div className="w-full max-w-6xl mb-6">
        <div className="bg-black h-6 flex items-center justify-center space-x-2 rounded-t-3xl">
          {Array(30)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-xs text-white">✿</span>
            ))}
        </div>
      </div>

      {/* Black Border Wrapper */}
      <div className="w-full max-w-6xl border-8 border-black rounded-3xl overflow-hidden">
        {/* Inner Cream Background */}
        <div className="bg-[#FBF4D5]">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="font-serif italic text-2xl">flavo</div>
            <ul className="flex space-x-8 uppercase text-sm">
              <li>Shop</li>
              <li>Our Story</li>
              <li>Contact Us</li>
            </ul>
            <div>
              {/* Cart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l1-5H6.4M7 13l-1.6 8h13.2L17 13M7 13H5.4M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative flex flex-col lg:flex-row items-center bg-[#83996E] p-8">
            {/* Yellow Flower Shape */}
            <div className="absolute top-4 left-8 text-yellow-300 text-8xl rotate-12">✽</div>
            {/* Pink Overlay Shape */}
            <div className="absolute top-0 right-0 h-1/2 w-1/2 bg-pink-300 rounded-bl-full" />
            <div className="relative z-10 lg:w-1/2 p-6 text-black">
              <h1 className="text-6xl font-extrabold uppercase leading-tight">
                당신의<br />커피를 찾아보세요
              </h1>
              <p className="mt-4 text-lg">
                구독하고 더 자세한 추천을 받아보세요
              </p>
              <div className="mt-6 flex space-x-4">
                <Link href="/find-coffee">
                  <button className="px-8 py-3 bg-black text-white uppercase rounded-full">
                    나만의 커피 찾기
                  </button>
                </Link>
                <Link href="/ai">
                  <button className="px-8 py-3 bg-black text-white uppercase rounded-full">
                    정확한 나만의 커피 찾기
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative z-10 lg:w-1/2 p-6">
              <Image
                src="/hero-spices.png"
                alt="Spice Jars"
                width={250}
                height={400}
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </section>

          {/* Scrolling Tags */}
          <div className="mt-6 overflow-x-auto whitespace-nowrap py-2 bg-white border-y border-gray-200">
            <div className="inline-flex items-center space-x-4 text-xs uppercase px-6">
              {['원두커피', '캡슐커피', '드립커피', '아라비카', '로부스타', '리베리카'].map(
                (tag, i) => (
                  <React.Fragment key={i}>
                    <span>{tag}</span>
                    {i < 6 && <span className="text-pink-400">✿</span>}
                  </React.Fragment>
                )
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-8 px-6 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-[#FBF4D5] p-6 rounded-xl border-2 border-black flex flex-col items-center"
              >
                <div className="text-2xl font-bold uppercase mb-4 tracking-wide">
                  {product.title}
                </div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={180}
                  height={260}
                  className="mb-4 object-contain"
                />
                <div className="flex items-center space-x-4 mb-4">
                  <button className="px-3 py-1 border border-black rounded-full">
                    -
                  </button>
                  <span className="text-base">1</span>
                  <button className="px-3 py-1 border border-black rounded-full">
                    +
                  </button>
                </div>
                <button className="mt-auto w-full py-2 bg-black text-white uppercase rounded-full">
                  Add to Cart – ${product.price}
                </button>
                {product.topPick && (
                  <div className="absolute top-2 right-2 bg-pink-200 text-pink-800 px-2 py-1 text-xs rounded-full">
                    Top Pick
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
