import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ data }) => ({
	checkout_id : data?.checkoutId,
	action_name : data?.action,
});

const useApproveUtr = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_subscription_order',
	}, { manual: true });

	const approveUtrHandler = async (data) => {
		const payload = getPayload({ data });
		try {
			await trigger({
				data: payload,
			});
			Toast.success(`Plan ${data.action}!`);
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		loading, approveUtrHandler,
	};
};

export default useApproveUtr;
