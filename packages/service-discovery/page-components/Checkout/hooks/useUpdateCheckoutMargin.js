import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const getApiErrorString = (messages) => Object.keys(messages || {})
	.map((_) => `${startCase(_)} ${messages[_]}`)
	.join(', ');

const useUpdateCheckoutMargin = ({ updateCheckout = () => {}, id = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_margin',
		method : 'POST',
	}, { manual: true });

	const updateCheckoutMargin = async ({ finalPayload }) => {
		try {
			await trigger({ data: finalPayload });

			Toast.success('Margin updated successfully');

			updateCheckout({
				values: {
					id,
					state: 'locked',
				},
				scrollToTop: true,
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	};

	return {
		updateCheckoutMargin,
		loading,
	};
};

export default useUpdateCheckoutMargin;
