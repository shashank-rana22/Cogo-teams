import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetExchangeRate = ({ setValue, from_cur, to_cur }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : 'get_exchange_rate',
			method : 'get',
		},
		{ manual: true },
	);

	const getExchangeRate = useCallback(() => {
		(async () => {
			try {
				const exData = await trigger({
					params: {
						from_currency : from_cur,
						to_currency   : to_cur,
					},
				});
				setValue('exchangeRate', exData?.data?.toFixed(2));
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger, from_cur, to_cur, setValue]);

	return {
		data,
		loading,
		getExchangeRate,
	};
};

export default useGetExchangeRate;
