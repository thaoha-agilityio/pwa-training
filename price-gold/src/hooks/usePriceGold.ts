import { useQuery } from '@tanstack/react-query';

// Types
import { GoldPrice, HistoricalGoldPrice } from '@/types';

// Constants
import {
  API_KEY,
  INIT_GOLD_PRICE,
  INIT_GOLD_PRICE_HISTORICAL,
  QUERY_KEYS,
} from '@/constants';

// Services
import { apiClient } from '@/services';

// Utils
import { latestAvailableDate, previousAvailableDate } from '@/utils';

export const useLatestPriceGold = (currency = 'USD') => {
  const { data, ...rest } = useQuery<GoldPrice, string>({
    queryKey: [QUERY_KEYS.PRICE_GOLD + currency],
    queryFn: async () => {
      const response = await apiClient.get<GoldPrice>(
        `latest?api_key=${API_KEY}&base=${currency}&currencies=XAU`,
      );

      return response.data as GoldPrice;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    ...rest,
    data: data || INIT_GOLD_PRICE,
  };
};

export const useHistoricalPriceGold = (currency = 'USD') => {
  const startDate = previousAvailableDate();
  const endDate = latestAvailableDate();

  const { data, ...rest } = useQuery<HistoricalGoldPrice, string>({
    queryKey: [QUERY_KEYS.PRICE_GOLD + currency + startDate + endDate],
    queryFn: async () => {
      const response = await apiClient.get<HistoricalGoldPrice>(
        `change?api_key=${API_KEY}&&start_date=${startDate}&end_date=${endDate}&base=${currency}&currencies=XAU`,
      );

      return response.data as HistoricalGoldPrice;
    },
    staleTime: 1000 * 60 * 60, // 1 hours
  });

  return {
    ...rest,
    data: data || INIT_GOLD_PRICE_HISTORICAL,
  };
};
