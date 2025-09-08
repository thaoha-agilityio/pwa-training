import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
import {
  useDebouncedCallback,
  useHistoricalPriceGold,
  useLatestPriceGold,
  useOnlineStatus,
} from '@/hooks';
import { getDeviceToken } from '@/utils';

export const Home = () => {
  const [currency, setCurrency] = useState(CURRENCIES_OPTIONS[0].value);
  const isOnline = useOnlineStatus();

  // Queries
  const {
    data: latestData,
    isFetching,
    refetch,
    error: errorLatest,
  } = useLatestPriceGold(currency);

  const { data: historicalData, error: errorHistorical } =
    useHistoricalPriceGold(currency);

  // Latest rates
  const { rates: latestRates } = latestData || {};
  const { rates: historicalRates } = historicalData || {};

  // Helpers
  const isUSD = currency === CURRENCIES_OPTIONS[0].value;
  const latestPrice = isUSD ? latestRates?.USDXAU : latestRates?.EURXAU;

  const TABS_DATA = [
    {
      value: 'gold',
      label: 'Gold',
      content: (
        <PriceGold
          isUSD={isUSD}
          latestPrice={latestPrice}
          change={historicalRates.XAU.change}
          changePercent={historicalRates.XAU.change_pct}
          currency={currency}
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

  useEffect(() => {
    if (errorLatest || errorHistorical) {
      toast.error('Fetch error', {
        description: errorLatest || errorHistorical,
      });
    }
  }, [errorLatest, errorHistorical]);

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
      <Button onClick={getDeviceToken}>get token</Button>
      {!isOnline && (
        <Typography className="text-destructive py-4">
          You are offline. Data may be outdated.
        </Typography>
      )}
      <TradingPriceChart />
    </div>
  );
};
