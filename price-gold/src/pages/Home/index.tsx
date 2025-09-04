// Components
import {
  Button,
  PriceGold,
  SelectDropdown,
  Tabs,
  Typography,
} from '@/components';

// Constants
import { CURRENCIES_OPTIONS } from '@/constants';

// Hooks
import { useLatestPriceGold } from '@/hooks';

export const Home = () => {
  const { data, isFetching, refetch } = useLatestPriceGold();

  const { USDXAU: latestPrice = 0 } = data?.rates || {};

  const TABS_DATA = [
    {
      value: 'gold',
      label: 'Gold',
      content: (
        <PriceGold latestPrice={latestPrice} change={0} changePercent={0} />
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

  return (
    <div className="m-auto w-5xl py-6">
      <Typography variant="h1">Gold Price Charts</Typography>
      <div className="my-6 flex justify-between">
        <Tabs tabs={TABS_DATA} />

        <div className="flex gap-4">
          <Button
            disabled={isFetching}
            isLoading={isFetching}
            onClick={() => refetch()}
          >
            Refresh
          </Button>
          <SelectDropdown
            options={CURRENCIES_OPTIONS}
            extraStyle="w-[200px]"
            onSelect={(value) => console.log(value)}
          />
        </div>
      </div>
    </div>
  );
};
