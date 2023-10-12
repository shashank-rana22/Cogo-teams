import { useRequest } from '@cogoport/request';

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({ data, formData, shipmemnt_data }) => {
		const { shipment_id = '', source_id = '', service_provider_id = '' } = data || {};
		const { is_shipper_specific = false, schedule_type = '', line_items = [] } = formData || {};
		const { summary } = shipmemnt_data || {};
		try {
			const resp = await trigger({
				data: {
					is_create_required      : false,
					shipment_id,
					id                      : source_id,
					is_reverted             : true,
					sourced_by_id           : service_provider_id,
					advance_amount_currency : line_items[0].currency,
					is_shipper_specific     : is_shipper_specific || undefined,
					schedule_type,
					importer_exporter_id    : is_shipper_specific === true ? summary?.importer_exporter_id : undefined,
				},
			});
			if (resp) { return resp?.status; }
		} catch (e) {
			// console.log('Something went wrong');
		}
		return null;
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;
