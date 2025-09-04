import { useQuery } from '@tanstack/react-query';

// Types
import { GoldPrice } from '@/types';

// Constants
import { API_KEY, QUERY_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

const initGoldPrice: GoldPrice = {
  date: '',
  price: 0,
  rates: {
    XAU: 0,
  },
};

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
    data: data || initGoldPrice,
  };
};
