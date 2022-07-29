import type { TodoStatus } from '../types';

export const translateStatus = (status: TodoStatus) => {
  // 日本語以外にも、複数の言語に翻訳したい場合は、以下のようなライブラリを使うことも検討する
  // https://github.com/i18next/react-i18next

  if (status === 'waiting') return '未着手';
  if (status === 'working') return '着手中';
  if (status === 'pending') return '保留中';
  if (status === 'discontinued') return '中止';
  if (status === 'completed') return '完了';

  // 将来新しくstatusが追加されて翻訳の追加が追いついていない場合は、
  // status値をそのまま表示することで対応する。
  return status;
};
