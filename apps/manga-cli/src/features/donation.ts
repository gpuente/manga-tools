import boxen from 'boxen';
import gradient from 'gradient-string';

import { i18n } from '../i18n';

const DONATION_URL = 'https://ko-fi.com/gpuente';

export const printDonationBox = (): void => {
  const content = `${i18n.translate('general.donation')}\n${DONATION_URL}`;
  const box = boxen(content, { padding: 1, margin: 1, borderStyle: 'double' });

  console.log(gradient.retro(box));
};
