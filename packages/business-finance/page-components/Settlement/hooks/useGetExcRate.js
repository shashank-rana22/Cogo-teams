import { useRequest } from '@cogoport/request';
// import { useCallback } from 'react';

const useGetExcRate = ({ from_cur, to_cur }) => {
	// console.log('fd', from_cur);
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : 'get_exchange_rate',
			method : 'get',
		},
		{ manual: true },
	);

	const getExchangeRate = () => {
		try {
			trigger({
				params: {
					from_currency : from_cur,
					to_currency   : to_cur,
				},
			});
			// setValue('exchangeRate', exData?.data?.toFixed(2));
		} catch (error) {
			console.log(error);
		}
	};

	return {
		data,
		loading,
		getExchangeRate,
	};
};

export default useGetExcRate;
