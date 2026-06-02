import type { Field } from './types';

export const FIELDS: Field[] = [
  { id: 'strategy',     name: 'マーケティング戦略',    description: 'STP分析・4P・競合分析・ポジショニング' },
  { id: 'research',     name: '市場調査・リサーチ',     description: '定量・定性調査・アンケート設計・データ分析' },
  { id: 'consumer',     name: '消費者行動',             description: '購買意思決定・心理・態度変容・ロイヤルティ' },
  { id: 'product',      name: '製品・ブランド管理',     description: '製品ライフサイクル・ブランド戦略・品質管理' },
  { id: 'pricing',      name: '価格戦略',               description: 'コスト・競合・需要志向の価格設定・値引き戦略' },
  { id: 'distribution', name: '流通・チャネル',         description: '流通チャネル設計・サプライチェーン・小売戦略' },
  { id: 'promotion',    name: 'プロモーション・広告',   description: '広告・販促・PR・IMC（統合マーケティングコミュニケーション）' },
  { id: 'digital',      name: 'デジタルマーケティング', description: 'SEO・SNS・コンテンツマーケティング・データ活用' },
];

export function getField(id: string): Field | undefined {
  return FIELDS.find((f) => f.id === id);
}
