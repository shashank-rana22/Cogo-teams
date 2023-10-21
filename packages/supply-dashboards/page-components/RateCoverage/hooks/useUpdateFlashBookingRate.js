import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { formatLineItems, formatFirstLineItem } from '../helpers/revertPriceHelpers';
import getPayload from '../payload/getRevertPricePayload';

const LINE_ITEMS_NOT_REQUIRED_FOR = ['air_freight', 'ftl_freight', 'ltl_freight', 'ftl_freight'];

const useUpdateFlashBookingRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const updateFlashBookingRate = async ({
		data, formData,
		shipment_data, filter, newServiceProviderData, falshBookingLineItems,
	}) => {
		const service = filter?.service;
		const { shipment_id, source_id, service_provider_id } = data || {};
		const { line_items: new_line_items, shipment_id:new_shipment_id } = falshBookingLineItems || {};
		const {
			service_provider_id : new_service_provider_id, shipping_line_id,
			currency: newCurrency, schedule_type: new_schedule_type, supplier_contract_no,
		} = newServiceProviderData || {};
		const {
			is_shipper_specific = false,
			weight_slabs, schedule_type,
			line_items, currency,
			chargeableWeight,
		} = formData || {};
		const { summary } = shipment_data || {};

		const WEIGHT_SLABS = (weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit || item?.price,
			currency     : item?.currency || data?.currency,
		}));

		let lineItemsParams = formatLineItems({ lineItems: line_items || new_line_items, values: formData });
		if (isEmpty(lineItemsParams) && !isEmpty(line_items)) {
			lineItemsParams = formatFirstLineItem({ lineItems: line_items, values: formData });
		}
		if (isEmpty(lineItemsParams) && !LINE_ITEMS_NOT_REQUIRED_FOR.includes(service)) {
			Toast.error(
				'You can not revert to this live booking - No LineItems!!',
			);
			return;
		}
		const formattedPayload = getPayload({
			lineItemsParams,
			values       : formData,
			id           : source_id,
			service_type : service,
			chargeableWeight,
		});

		try {
			const resp = await trigger({
				data: {
					service_type              : `${service}_service` || undefined,
					is_rate_creation_required : false,
					shipment_id               : shipment_id || new_shipment_id,
					id                        : source_id,
					sourced_by_id             : service_provider_id,
					currency,
					advance_amount_currency   : newCurrency || undefined,
					schedule_type             : schedule_type || new_schedule_type,
					is_shipper_specific       : is_shipper_specific || undefined,
					importer_exporter_id      : is_shipper_specific === true ? summary?.importer_exporter_id
						: undefined,
					weight_slabs         : WEIGHT_SLABS,
					formattedPayload     : formattedPayload || undefined,
					service_provider_id  : new_service_provider_id || service_provider_id || undefined,
					shipping_line_id     : shipping_line_id || undefined,
					supplier_contract_no : supplier_contract_no || undefined,
				},
			});
			// eslint-disable-next-line consistent-return
			if (resp) { return resp?.status; }
		} catch (e) {
			Toast.error('Failed To Cancel');
		}
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;
