import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({ data, formData, shipment_data }) => {
		const { shipment_id, source_id, service_provider_id } = data || {};
		const { is_shipper_specific = false, schedule_type, customs_line_items = [], currency } = formData || {};
		const { summary } = shipment_data || {};
		try {
			const resp = await trigger({
				data: {
					is_create_required   : false,
					shipment_id,
					id                   : source_id,
					is_reverted          : true,
					sourced_by_id        : service_provider_id,
					currency,
					is_shipper_specific  : is_shipper_specific || undefined,
					schedule_type,
					importer_exporter_id : is_shipper_specific === true ? summary?.importer_exporter_id : undefined,
					line_items           : customs_line_items || undefined,
				},
			});
			if (resp) { return resp?.status; }
		} catch (e) {
			Toast.error('Failed To Cancel');
		}
		return null;
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;
