import { useRequest } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useGetExcRate = ({ from_cur = '', to_cur = '' }) => {
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
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		data,
		loading,
		getExchangeRate,
	};
};

export default useGetExcRate;
