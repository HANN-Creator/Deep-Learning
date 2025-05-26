'use client';
import React, { FormEvent, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PreciseCoffeePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/precise-coffee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.recommendation);
    } catch (err) {
      console.error(err);
      setResult('추천을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF4D5] p-6">
      <h1 className="text-3xl font-semibold mb-4">정확한 나만의 커피 찾기</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-4 border rounded-lg mb-4"
          rows={4}
          placeholder="취향, 선호하는 맛, 자주 마시는 방법 등을 입력하세요..."
          value={prompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full py-2 bg-black text-white rounded-full disabled:opacity-50"
        >
          {loading ? '추천 생성 중...' : '추천 받기'}
        </button>
      </form>
      {result && (
        <div className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">추천 결과</h2>
          <p>{result}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}