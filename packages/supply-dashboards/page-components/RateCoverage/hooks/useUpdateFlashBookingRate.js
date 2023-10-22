import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { formatLineItems, formatWeightSlabs } from '../helpers/revertPriceHelpers';

import useShipmentBuyQuotations from './useShipmentBuyQuotations';

const LINE_ITEMS_NOT_REQUIRED_FOR = ['air_freight', 'ftl_freight', 'ltl_freight', 'ftl_freight'];

const useUpdateFlashBookingRate = ({
	data, filter,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const service = filter?.service;
	const { shipment_id } = data || {};
	const service_id = data?.shipment_service_id;
	const { line_items: quotationLineItems } = useShipmentBuyQuotations({
		shipment_id,
		service_id,
	});

	const updateFlashBookingRate = async ({
		formData = {}, manualRevertData = {}, isManual = false,
	}) => {
		const {
			is_shipper_specific = false,
			line_items = [],
		} = formData || {};
		const values = { ...formData, ...manualRevertData };

		const lineItemsParams = formatLineItems({
			lineItems: isManual ? quotationLineItems : line_items,
			values,
			isManual,
			quotationLineItems,
		});
		const formattedWeightSlabs = formatWeightSlabs({ values });
		if (isEmpty(lineItemsParams) && !LINE_ITEMS_NOT_REQUIRED_FOR.includes(service)) {
			Toast.error(
				'You can not revert to this live booking - No LineItems!!',
			);
			return;
		}

		try {
			const resp = await trigger({
				data: {
					line_items           : lineItemsParams,
					shipping_line_id     : values?.shipping_line_id || undefined,
					airline_id           : values?.airline_id || undefined,
					price_type           : values?.price_type || undefined,
					operation_type       : values?.operation_type || undefined,
					weight_slabs         : formattedWeightSlabs,
					is_reverted          : true,
					service_id           : isManual ? service_id : undefined,
					service_type         : isManual ? `${service}_service` : undefined,
					shipment_id          : isManual ? shipment_id : undefined,
					supplier_contract_no : values.supplier_contract_no || undefined,
					transit_time         : values?.transit_time || undefined,
					detention_free_time  : values?.detention_free_time || undefined,
					validity_end         : values?.validity_end || undefined,
					sourced_by_id        : values?.sourced_by_id,
					service_provider_id  : isManual
						? values.service_provider_id
						: undefined,
					remarks: values?.remarks || undefined,
					advance_amount:
					service === 'ftl_freight'
						? Number(values?.advanced_amount || 0)
						: undefined,
					advance_amount_currency : values?.currency,
					chargeable_weight       : Number(values?.chargeable_weight) || undefined,
					is_shipper_specific     : is_shipper_specific || undefined,
					schedule_type           : values.schedule_type || undefined,
					rate_type               : values?.rate_type || undefined,
				},
			});
			// eslint-disable-next-line consistent-return
			if (resp?.status) { return resp?.status; }
		} catch (e) {
			Toast.error(e);
		}
	};

	return {
		loading,
		updateFlashBookingRate,
	};
};

export default useUpdateFlashBookingRate;
