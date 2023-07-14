import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateMarginValue = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_margin_value',
		method : 'POST',
	}, { manual: true });

	const updateMarginValue = async ({ payload }) => {
		try {
			await trigger({
				data: {
					...payload,
				},
			});
			Toast.success('Updated the Margin Threshold Successfully ');
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updateMarginValue,
		loading,

	};
};

export default useUpdateMarginValue;
