import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getBuyPrice from '../utils/getBuyPrice';

const VOLUMETRIC_WEIGHT = 166.67;
const DECIMAL_PLACE = 2;
const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const useSendBookingRequestEmail = (onCancel, setShowEmailPreview, checkboxValue) => {
	const [{ loading, data: emailData }, trigger] = useRequest({
		url    : '/send_booking_request_email_to_airline',
		method : 'POST',
	}, { manual: true });

	const sendBookingRequestEmail = async (
		item,
		taskData,
		data,
		handOverDate,
		show_preview_only,
		serviceProvidersData,
		pocData,
	) => {
		try {
			await trigger({
				data: {
					shipment_id       : taskData?.data?.shipment?.id,
					airline_id        : data?.reverted_airline?.id,
					buy_price         : getBuyPrice(data, item.source),
					handover_date     : handOverDate,
					show_preview_only,
					gross_weight      : data?.service?.weight,
					volumetric_weight : ((data?.service?.volume || DEFAULT_VALUE_FOR_NULL_HANDLING)
					* VOLUMETRIC_WEIGHT).toFixed(DECIMAL_PLACE),
					preference_id       : item?.preference_id,
					priority            : item?.priority,
					service_providers   : serviceProvidersData,
					service_provider_id : data?.service_provider_id,
					poc_name            : pocData?.name,
					poc_email           : pocData?.email,
					cc_email            : checkboxValue,
				},
			});

			setShowEmailPreview(show_preview_only);
			if (!show_preview_only) {
				Toast.success(
					'booking email sent successfully, please check email status in Emails tab.',
				);
				onCancel();
			}
		} catch (err) {
			Toast.error(
				toastApiError(err),
			);
		}
	};

	return {
		emailData,
		loading,
		sendBookingRequestEmail,
	};
};

export default useSendBookingRequestEmail;
