import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const useUpdateCheckoutMargin = ({ updateCheckout = () => {}, id = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_margin',
		method : 'POST',
	}, { manual: true });

	const updateCheckoutMargin = async ({
		finalPayload,
		setIsLoadingStateRequired = () => {},
		serviceRemoved = false,
		getCheckout = () => {},
	}) => {
		try {
			await trigger({ data: finalPayload });

			Toast.success('Margin updated successfully');

			await updateCheckout({
				values: {
					id,
					state: 'locked',
				},
				scrollToTop: true,
			});

			setIsLoadingStateRequired(false);
		} catch (error) {
			setIsLoadingStateRequired(false);

			if (serviceRemoved) {
				getCheckout();
			}

			if (error?.response) {
				Toast.error(startCase(getApiErrorString(error?.response?.data) || 'Something went wrong'));
			}
		}
	};

	return {
		updateCheckoutMargin,
		loading,
	};
};

export default useUpdateCheckoutMargin;
