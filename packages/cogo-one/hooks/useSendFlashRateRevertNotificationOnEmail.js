import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ userId, response = {} }) => ({
	user_id               : userId,
	flash_booking_rate_id : response?.data?.id,
});

const useSendFlashRateRevertNotificationOnEmail = ({ userId }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_flash_rate_revert_notification_on_email',
		method : 'post',
	}, { manual: true });

	const sendNotificationEmail = async ({ response }) => {
		try {
			await trigger({
				data: getPayload({ userId, response }),
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendNotificationEmail,
		loading,
	};
};

export default useSendFlashRateRevertNotificationOnEmail;
