// Types
import { Currency } from '@/types';

// Components
import { Typography } from '../common/Typography';

// Utils
import { formatCurrency } from '@/utils';

interface PriceGoldProps {
  latestPrice: number;
  change: number;
  changePercent: number;
  currency?: Currency;
}

export const PriceGold = ({
  latestPrice,
  change,
  changePercent,
}: PriceGoldProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Typography variant="h2">{formatCurrency(latestPrice)} USD</Typography>
      <Typography variant="span">
        Change: - {change} USD{' '}
        <span className="font-semibold text-increase">{changePercent}</span>
      </Typography>
      <Typography variant="p">24H</Typography>
    </div>
  );
};
