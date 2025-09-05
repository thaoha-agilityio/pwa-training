// Components
import { Typography } from '../common/Typography';

// Utils
import { formatChange, formatCurrency, formatPercent } from '@/utils';

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

  const isPositiveAmount = changePercent >= 0;

  return (
    <div className="flex gap-3 items-center">
      <Typography variant="h2">
        {symbol}
        {formatCurrency(latestPrice)} {currency}
      </Typography>
      <Typography variant="span">
        Change: {formatChange(change, currency)}{' '}
        <span
          className={`font-medium  ${
            isPositiveAmount ? 'text-increase' : 'text-decrease'
          }`}
        >
          {formatPercent(changePercent)}
        </span>
      </Typography>
      <Typography variant="p">24H</Typography>
    </div>
  );
};
