import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ userId, bookingRateId }) => ({
	source_user_id        : userId,
	flash_booking_rate_id : bookingRateId,
});

const useSendFlashRateRevertNotificationOnEmail = ({ userId }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_flash_rate_revert_notification_on_email',
		method : 'post',
	}, { manual: true });

	const sendNotificationEmail = async ({ bookingRateId = '' }) => {
		try {
			await trigger({
				data: getPayload({ userId, bookingRateId }),
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
