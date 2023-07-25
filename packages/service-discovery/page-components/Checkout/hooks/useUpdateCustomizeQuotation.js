import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCustomizeQuotation = ({ setAddLineItemData, getCheckout }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout_customize_quotation',
	}, { manual: true });

	const updateCustomizeQuotation = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCheckout();

			setAddLineItemData({});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updateCustomizeQuotation,
		loading,
	};
};

export default useUpdateCustomizeQuotation;
