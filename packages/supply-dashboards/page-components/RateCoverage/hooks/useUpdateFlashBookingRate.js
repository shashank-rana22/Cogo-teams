import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const MINIMUM_PRICE = 1;
const PERCENTAGE = 100;
const NUMBER_FALLBACK = 0;

const formatLineItems = ({ lineItems, values }) => {
	const { chargeable_weight = 0, price = 0, min_price = 0 } = values || {};
	return (lineItems || []).filter(
		(eachItem) => GLOBAL_CONSTANTS.flash_booking_charge_codes.includes(eachItem?.code),
	).map((item) => {
		const quantity = Number(chargeable_weight) || item.quantity;
		const tax_price = (Number(price) * (item.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
		return {
			...item,
			quantity,
			market_price    : Number(item?.market_price),
			price           : Number(price),
			total_price     : Number(price) * (quantity || MINIMUM_PRICE),
			tax_price,
			tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
			currency        : item?.currency,
			min_price       : Number(min_price) || item?.min_price,
		};
	}) || [];
};

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({ data, formData, shipment_data, filter }) => {
		const { shipment_id, source_id, service_provider_id } = data || {};
		const {
			is_shipper_specific = false, weight_slabs, schedule_type, line_items, currency,
		} = formData || {};
		const { summary } = shipment_data || {};

		const WEIGHT_SLABS = (weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit || item?.price,
			currency     : item?.currency || data?.currency,
		}));

		const fromattedLineItems = formatLineItems({ lineItems: line_items, values: formData });

		try {
			const resp = await trigger({
				data: {
					service_type         : `${filter?.service}_service`,
					is_create_required   : false,
					shipment_id,
					id                   : source_id,
					is_reverted          : true,
					sourced_by_id        : service_provider_id,
					currency,
					schedule_type,
					is_shipper_specific  : is_shipper_specific || undefined,
					importer_exporter_id : is_shipper_specific === true ? summary?.importer_exporter_id : undefined,
					weight_slabs         : WEIGHT_SLABS,
					line_items           : fromattedLineItems,

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
