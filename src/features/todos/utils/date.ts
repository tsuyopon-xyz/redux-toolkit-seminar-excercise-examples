import dayjs from 'dayjs';

export type DateTime = string;

export const getCurrentDateTime = (): DateTime => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};
