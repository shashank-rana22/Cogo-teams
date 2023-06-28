import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useSendPromotionalRate({ activeMessageCard = {} }) {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotional_rate_communication',
			method : 'post',
		},
		{ manual: true },
	);

	const { user_id = '', mobile_no = '', lead_user_id = '' } = activeMessageCard;

	const sendPromotionalRate = async () => {
		try {
			await trigger({
				data: {
					recipient    : mobile_no,
					user_id      : user_id || undefined,
					lead_user_id : lead_user_id || undefined,

				},
			});
			Toast.success('Promotional Rate Send Sucessfully');
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
