import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { getField } from '@/lib/fields';
import type { Question } from '@/lib/types';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  const { fieldId } = await request.json();

  const field = getField(fieldId);
  if (!field) {
    return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `あなたはマーケティング検定2級の試験問題作成の専門家です。\n指定された分野について、実際の検定試験レベルの四択問題を5問作成してください。\n\n必ず以下のJSON形式のみで返答してください（説明文・コードブロック不要）：\n[\n  {\n    "text": "問題文",\n    "choices": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],\n    "correctIndex": 0,\n    "explanation": "正解の解説（なぜその答えが正しいか、他の選択肢がなぜ間違いかを含む）"\n  }\n]\n\n条件：\n- 検定2級レベルの難易度（基礎〜応用）\n- 実務的・実践的な内容を含める\n- 正解の選択肢の位置（correctIndex: 0〜3）はランダムに分散させる\n- 解説は150〜200字程度で丁寧に書く\n- 問題文は明確で誤解のない表現にする`,
    messages: [
      {
        role: 'user',
        content: `分野「${field.name}」（${field.description}）について、マーケティング検定2級レベルの四択問題を5問作成してください。`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\[\s\S\]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: 'Failed to parse questions' }, { status: 500 });
  }

  const raw = JSON.parse(jsonMatch[0]) as Array<{
    text: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
  }>;

  const questions: Question[] = raw.map((q, i) => ({
    id: `${fieldId}-${Date.now()}-${i}`,
    fieldId,
    text: q.text,
    choices: q.choices,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));

  return NextResponse.json({ questions });
}
