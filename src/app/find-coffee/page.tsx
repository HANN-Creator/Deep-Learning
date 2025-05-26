'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Step data
const steps = ['습관', '커피맛', '디카페인', '성향', '추천'] as const;

// Option definitions
const brewMethods = [
  { id: 'maker', title: '에스프레소 머신', icon: '/method-maker.png' },
  { id: 'drip', title: '핸드 드립', icon: '/method_drip.png' },
  { id: 'moka', title: '캡슐 커피', icon: '/method_moka.png' },
  { id: 'cold', title: '콜드브루', icon: '/method_cold.png' },
] as const;
const tasteOptions = [
  { id: 'black', title: '블랙 그대로', icon: '/taste_black.png' },
  { id: 'latte', title: '우유를 더한 라떼', icon: '/taste_latte.png' },
  { id: 'sugar', title: '설탕을 넣은 커피', icon: '/taste_sugar.png' },
  { id: 'syrup', title: '시럽을 넣은 커피', icon: '/taste_syrup.png' },
] as const;
const decafOptions = [
  { id: 'caff', title: '카페인 원두' },
  { id: 'decaf', title: '디카페인 원두' },
] as const;
const styleOptions = [
  { id: 'origin', title: '싱글 오리진의 순수함' },
  { id: 'traditional', title: '전통 블렌드의 균형' },
  { id: 'blend', title: '커스텀 블렌드의 조화' },
] as const;

type MethodId = typeof brewMethods[number]['id'];
type TasteId = typeof tasteOptions[number]['id'];
type DecafId = typeof decafOptions[number]['id'];
type StyleId = typeof styleOptions[number]['id'];

interface Choice {
  method: MethodId | null;
  taste: TasteId | null;
  decaf: DecafId | null;
  style: StyleId | null;
}

// Map method+style to actual bean recommendation
const beanMap: Record<string, string> = {
  'maker-origin': '콜롬비아 수프리모 후일라',
  'drip-origin': '에티오피아 예가체프 G1',
  'moka-origin': '과테말라 안티구아 SHB',
  'cold-origin': '케냐 AA 콜드브루 스페셜',

  'maker-traditional': '브라질 산토스',
  'drip-traditional': '인도네시아 만델링',
  'moka-traditional': '멕시코 치아파스',
  'cold-traditional': '베트남 다크 로스트',

  'maker-blend': '하우스 블렌드: 브라질&콜롬비아',
  'drip-blend': '시그니처 블렌드',
  'moka-blend': '스페셜 블렌드',
  'cold-blend': '콜드브루 시그니처 블렌드',
};

export default function FindCoffeePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState<Choice>({ method: null, taste: null, decaf: null, style: null });

  function select<K extends keyof Choice>(key: K, value: Choice[K]) {
    setChoice(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  }

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-4xl mx-auto">
            {brewMethods.map(m => (
              <div
                key={m.id}
                onClick={() => select('method', m.id)}
                className="p-4 bg-white rounded-lg border hover:shadow-md cursor-pointer flex flex-col items-center"
              >
                <Image src={m.icon} width={80} height={80} alt={m.title} />
                <p className="mt-2 text-center text-sm">{m.title}</p>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
            {tasteOptions.map(t => (
              <div
                key={t.id}
                onClick={() => select('taste', t.id)}
                className="p-4 bg-white rounded-lg border hover:shadow-md cursor-pointer flex flex-col items-center"
              >
                <Image src={t.icon} width={64} height={64} alt={t.title} />
                <p className="mt-2 text-center text-sm">{t.title}</p>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
            {decafOptions.map(d => (
              <button
                key={d.id}
                onClick={() => select('decaf', d.id)}
                className="p-6 bg-white rounded-lg border hover:shadow-md"
              >
                {d.title}
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {styleOptions.map(s => (
              <div
                key={s.id}
                onClick={() => select('style', s.id)}
                className="p-6 bg-white rounded-lg border hover:shadow-md cursor-pointer"
              >
                <p className="text-center font-semibold">{s.title}</p>
              </div>
            ))}
          </div>
        );
      case 5:
        const key = `${choice.method}-${choice.style}`;
        const baseBean = beanMap[key] || '원두를 추천할 수 없습니다.';
        const finalText = `${choice.decaf === 'decaf' ? '디카페인 ' : ''}${baseBean}`;
        const tasteNote = choice.taste && tasteOptions.find(t => t.id === choice.taste)?.title;
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">추천 원두</h3>
            <p className="text-lg mb-2">{finalText}</p>
            {tasteNote && <p className="text-sm text-gray-600 mb-4">(`{tasteNote}` 스타일)</p>}
            <button onClick={() => router.push('/')} className="px-6 py-2 bg-black text-white rounded-full">처음으로</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF4D5] flex flex-col items-center py-8 px-4 relative">
      <button onClick={() => (step > 1 ? setStep(step - 1) : router.push('/'))} className="absolute top-6 left-6">← 뒤로</button>
      <Link href="/">
        <button className="absolute top-6 right-6">✕ 닫기</button>
      </Link>
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${step - 1 === i ? 'bg-pink-500' : 'bg-gray-300'}`} />
            {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-300 mx-2" />}          
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-6">{steps[step - 1]}</h2>
      <div className="w-full flex-grow flex items-center justify-center">{renderContent()}</div>
    </div>
  );
}
