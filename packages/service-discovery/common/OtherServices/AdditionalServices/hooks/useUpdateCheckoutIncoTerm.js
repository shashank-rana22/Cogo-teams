import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCheckoutIncoTerm = ({ getCheckout = () => {}, checkout_id = '', setIncoTermModalData = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_checkout_inco_term',
		},
		{ manual: true },
	);

	const updateCheckoutIncoTerm = async ({ inco_term = '' }) => {
		try {
			await trigger({ data: { id: checkout_id, inco_term } });
			Toast.success('Inco term updated successfully!');

			await getCheckout();
			setIncoTermModalData({});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		updateCheckoutIncoTerm,
		loading,
	};
};

export default useUpdateCheckoutIncoTerm;
