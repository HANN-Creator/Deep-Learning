import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '당신은 커피 전문가입니다. 사용자의 취향에 맞는 커피 원두를 추천하세요.' },
        { role: 'user', content: prompt }
      ]
    });
    const recommendation = chat.choices[0].message?.content || '추천을 생성하지 못했습니다.';
    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ recommendation: '추천 요청 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
