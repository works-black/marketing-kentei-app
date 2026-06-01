import Anthropic from '@anthropic-ai/sdk';
import type { Message, Plan } from '@/lib/types';

const client = new Anthropic();

export async function POST(request: Request) {
  const { messages } = await request.json() as { messages: Message[] };

  const conversationText = messages
    .map((m) => `${m.role === 'user' ? '利用者' : 'AI'}: ${m.content}`)
    .join('\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2048,
    system: `あなたはWill Bプログラムの外出支援プラン作成の専門家です。面談の会話内容をもとに、現実的で実行可能な3ヶ月間の外出支援プランを作成してください。\n\n必ず以下のJSON形式のみで返答してください（説明文不要）：\n{\n  "summary": {\n    "barriers": ["阻害要因1", "阻害要因2"],\n    "strengths": ["強み1", "強み2"],\n    "goal": "3ヶ月後のゴール文",\n    "notes": "特記事項"\n  },\n  "months": [\n    {"month": 1, "destination": "行き先", "purpose": "目的・内容"},\n    {"month": 2, "destination": "行き先", "purpose": "目的・内容"},\n    {"month": 3, "destination": "行き先", "purpose": "目的・内容"}\n  ],\n  "firstSteps": ["ファーストステップ1", "ファーストステップ2", "ファーストステップ3"],\n  "notes": "プラン全体の補足事項"\n}`,
    messages: [
      {
        role: 'user',
        content: `以下の面談会話をもとに、外出支援プランを作成してください：\n\n${conversationText}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json({ error: 'Failed to parse plan' }, { status: 500 });
  }

  const plan = JSON.parse(jsonMatch[0]) as Plan;
  return Response.json(plan);
}
