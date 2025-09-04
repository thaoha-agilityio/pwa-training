import { useQuery } from '@tanstack/react-query';

// Types
import { GoldPrice } from '@/types';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

export const usePriceGold = (currency = 'USD') => {
  const { data, ...rest } = useQuery<GoldPrice, string>({
    queryKey: [QUERY_KEYS.PRICE_GOLD],
    queryFn: async () => {
      const response = await apiClient.get<GoldPrice>(
        `&base=${currency}&currencies=XAU`,
      );

      return response.data as GoldPrice;
    },
  });

  return {
    ...rest,
    data,
  };
};
