import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendWhatsappBooking = () => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const [{ loading:whatsappLoading }, trigger] = useRequest({
		method : 'post',
		url    : '/send_booking_whatsapp_confirmation',
	}, { manual: true });

	const sendWhatsappBooking = async (recipient) => {
		const params = {
			checkout_id,
			recipient,
			shipment_id,
		};

		try {
			await trigger({
				data: params,
			});

			Toast.success('Confirmation Message Sent Sucessfully on Whatsapp');
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	return {
		sendWhatsappBooking,
		whatsappLoading,
	};
};

export default useSendWhatsappBooking;
