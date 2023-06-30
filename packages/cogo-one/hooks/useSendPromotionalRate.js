import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ formattedData }) => {
	const { user_id = '', mobile_no = '', lead_user_id = '' } = formattedData;
	return {
		recipient    : mobile_no,
		user_id      : user_id || undefined,
		lead_user_id : lead_user_id || undefined,
	};
};

function useSendPromotionalRate({ formattedData = {} }) {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotional_rate_communication',
			method : 'post',
		},
		{ manual: true },
	);

	const sendPromotionalRate = async () => {
		try {
			await trigger({
				data: getPayload({ formattedData }),
			});
			Toast.success('Promotional Rate Sent Sucessfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendPromotionalRate,
		loading,
	};
}

export default useSendPromotionalRate;
