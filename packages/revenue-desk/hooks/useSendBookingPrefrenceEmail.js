import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useSendBookingPrefrenceEmail = (
	singleServiceSellRateDetails,
	shipment_id,
) => {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/send_booking_preference_email',
	}, { manual: true });

	const emailTrigger = async () => {
		try {
			await trigger({
				data: { preferences: singleServiceSellRateDetails, shipment_id },
			});
			Toast.success('Email sent successfully');
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		loading,
		emailTrigger,
	};
};

export default useSendBookingPrefrenceEmail;
