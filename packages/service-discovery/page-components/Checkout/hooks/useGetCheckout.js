import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetCheckout = ({ checkout_id, setIsLoadingStateRequired = () => [] }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_checkout',
		params : { id: checkout_id },
	}, { manual: !checkout_id });

	const getCheckout = async () => {
		try {
			await trigger({ params: { id: checkout_id } });

			setIsLoadingStateRequired(false);
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		data,
		loading,
		getCheckout,
		trigger,
	};
};

export default useGetCheckout;
