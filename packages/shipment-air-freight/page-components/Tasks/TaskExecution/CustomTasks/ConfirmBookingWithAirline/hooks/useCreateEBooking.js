import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

// import getBuyPrice from '../utils/getBuyPrice';

// const VOLUMETRIC_WEIGHT = 166.67;
// const DECIMAL_PLACE = 2;
// const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const useCreateEBooking = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/e-booking',
			method  : 'POST',
			authKey : 'post_air_coe_e_booking',
		},
	);

	const createEBooking = async () => {
		try {
			await trigger({
				data: {
					// shipment_id       : taskData?.data?.shipment?.id,
					// airline_id        : data?.reverted_airline?.id,
					// buy_price         : getBuyPrice(data, item.source),
					// handover_date     : handOverDate,
					// show_preview_only,
					// gross_weight      : data?.service?.weight,
					// volumetric_weight : ((data?.service?.volume || DEFAULT_VALUE_FOR_NULL_HANDLING)
					// * VOLUMETRIC_WEIGHT).toFixed(DECIMAL_PLACE),
					// preference_id       : item?.preference_id,
					// priority            : item?.priority,
					// service_providers   : serviceProvidersData,
					// service_provider_id : data?.service_provider_id,
				},
			});

			Toast.success(
				'booking email sent successfully, please check email status in Emails tab.',
			);
		} catch (err) {
			toastApiError(err?.error?.message || ['Something went wrong.']);
		}
	};

	return {
		loading,
		createEBooking,
	};
};

export default useCreateEBooking;
