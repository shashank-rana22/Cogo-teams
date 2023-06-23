import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { formatLineItems, formatFirstLineItem } from '../helpers/revertPriceHelpers';

const weightSlabs = (values) => {
	const { price = 0, currency = '', weight_slabs = [] } = values || {};
	const { lower_limit = '', upper_limit = '' } = weight_slabs[GLOBAL_CONSTANTS.zeroth_index];

	return [{ currency, tariff_price: price, unit: 'per_kg', lower_limit, upper_limit }];
};

const getPayload = ({ lineItemsParams, values = {}, id }) => ({
	line_items           : lineItemsParams,
	shipping_line_id     : values.shipping_line_id || undefined,
	airline_id           : values.airline_id || undefined,
	price_type           : values.price_type || undefined,
	operation_type       : values.operation_type || undefined,
	is_reverted          : true,
	id,
	supplier_contract_no : values.supplier_contract_no || undefined,
	validity_end         : values.validity_end || undefined,
	sourced_by_id        : values.sourced_by_id,
	remarks              : values.remarks || undefined,
	chargeable_weight    : Number(values?.chargeable_weight) || undefined,
	weight_slabs         : values.weight_slabs ? weightSlabs(values) : undefined,

});

const useRevertPrice = ({ item, setModalState, shipmentFlashBookingRates }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const { line_items = [], id = '' } = item || {};

	const handleRevertPrice = async (values) => {
		try {
			let lineItemsParams = formatLineItems({ lineItems: line_items, values });

			if (isEmpty(lineItemsParams) && !isEmpty(line_items)) {
				lineItemsParams = formatFirstLineItem({ lineItems: line_items, values });
			}

			if (isEmpty(lineItemsParams)) {
				Toast.error(
					'You can not revert to this live booking - No LineItems!!',
				);
				return;
			}

			await trigger({
				data: getPayload({ lineItemsParams, values, id }),
			});

			Toast.success('Price successfully reverted.');
			shipmentFlashBookingRates({ page: 1 });
			setModalState({ isOpen: false, data: {} });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		handleRevertPrice,
	};
};

export default useRevertPrice;
