import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetCheckout = ({ checkout_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_checkout',
		params : { id: checkout_id },
	}, { manual: !checkout_id });

	const getCheckout = async () => {
		try {
			const res = await trigger({ params: { id: checkout_id } });

			return { data: res?.data || {}, hasError: false };
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}

			return { data: error, hasError: true };
		}
	};

	return {
		data,
		loading,
		getCheckout,
	};
};

export default useGetCheckout;
