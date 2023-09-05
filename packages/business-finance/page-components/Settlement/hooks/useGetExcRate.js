import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

export function toastApiError(err) {
	let message = '';
	if (err?.response?.data) {
		if (err.response.data?.base) {
			message = err.response.data.base;
		} else if (err.response.data.message) {
			message = err.response.data.message;
		}
	} else if (err?.message) {
		message = err.message;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
}

const useGetExcRate = ({ from_cur, to_cur }) => {
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
