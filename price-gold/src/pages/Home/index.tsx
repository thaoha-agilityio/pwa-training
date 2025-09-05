import { useState } from 'react';

// Components
import {
  Button,
  PriceGold,
  SelectDropdown,
  Tabs,
  Typography,
  TradingPriceChart,
} from '@/components';

// Constants
import { CURRENCIES_OPTIONS } from '@/constants';

// Hooks
import { useDebouncedCallback, useLatestPriceGold } from '@/hooks';

export const Home = () => {
  const [currency, setCurrency] = useState(CURRENCIES_OPTIONS[0].value);

  const { data, isFetching, refetch } = useLatestPriceGold(currency);

  const currencyRate = data.rates;

  const isUSD = currency === CURRENCIES_OPTIONS[0].value;

  const latestPrice = isUSD ? currencyRate.USDXAU : currencyRate.EURXAU;

  const TABS_DATA = [
    {
      value: 'gold',
      label: 'Gold',
      content: (
        <PriceGold
          latestPrice={latestPrice}
          change={0}
          changePercent={0}
          currency={currency}
          isUSD={isUSD}
        />
      ),
    },
    {
      value: 'sliver',
      label: 'Sliver',
      content: <Typography>Sliver</Typography>,
    },
    {
      value: 'platinum',
      label: 'Platinum',
      content: <Typography>Platinum</Typography>,
    },
    {
      value: 'palladium',
      label: 'Palladium',
      content: <Typography>Palladium</Typography>,
    },
  ];

  const handleRefresh = useDebouncedCallback(() => refetch(), 500);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  return (
    <div className="p-3 w-full m-auto md:max-w-6xl py-6">
      <Typography variant="h1">Gold Price Charts</Typography>
      <div className="my-6 flex  md:flex-row flex-col-reverse justify-between">
        <Tabs tabs={TABS_DATA} />

        <div className="flex pb-1 gap-2 md:gap-4">
          <Button
            disabled={isFetching}
            isLoading={isFetching}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          <SelectDropdown
            selectedValue={currency}
            options={CURRENCIES_OPTIONS}
            extraStyle="w-[120px] md:w-[200px]"
            onSelect={handleCurrencyChange}
          />
        </div>
      </div>

      <TradingPriceChart />
    </div>
  );
};
