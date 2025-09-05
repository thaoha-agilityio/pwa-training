// Components
import { Typography } from '../common/Typography';

// Utils
import { formatCurrency } from '@/utils';

interface PriceGoldProps {
  latestPrice?: number;
  change: number;
  changePercent: number;
  currency: string;
  isUSD?: boolean;
}

export const PriceGold = ({
  latestPrice = 0,
  change,
  changePercent,
  currency,
  isUSD,
}: PriceGoldProps) => {
  const symbol = isUSD ? '$' : '€';

  return (
    <div className="flex gap-3 items-center">
      <Typography variant="h2">
        {symbol}
        {formatCurrency(latestPrice)} {currency}
      </Typography>
      <Typography variant="span">
        Change: - {change} {currency}{' '}
        <span className="font-semibold text-increase">{changePercent}</span>
      </Typography>
      <Typography variant="p">24H</Typography>
    </div>
  );
};
