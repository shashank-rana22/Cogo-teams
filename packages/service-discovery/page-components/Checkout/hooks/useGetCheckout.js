import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetCheckout = ({ checkout_id, setIsLoadingStateRequired = () => {} }) => {
	const [{ data, loading, error = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_checkout',
		params : { id: checkout_id },
	}, { manual: !checkout_id });

	const getCheckout = async () => {
		try {
			await trigger({ params: { id: checkout_id } });

			setIsLoadingStateRequired(false);
		} catch (err) {
			if (err?.response) {
				Toast.error(getApiErrorString(err?.response?.data));
			}
		}
	};

	return {
		data,
		loading,
		getCheckout,
		trigger,
		error,
	};
};

export default useGetCheckout;
