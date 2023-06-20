import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const MINIMUM_PRICE = 1;
const PERCENTAGE = 100;
const NUMBER_FALLBACK = 0;

const formatLineItems = ({ lineItems, values }) => {
	const { chargeable_weight = 0, price = 0, currency = '', min_price = 0 } = values || {};
	return (lineItems || []).map((eachitem) => {
		if (
			GLOBAL_CONSTANTS.flash_booking_charge_codes.includes(eachitem?.code)
		) {
			const quantity = Number(chargeable_weight) || eachitem.quantity;
			const tax_price = (Number(price) * (eachitem.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
			return {
				...eachitem,
				quantity,
				price           : Number(price),
				total_price     : Number(price) * (quantity || MINIMUM_PRICE),
				tax_price,
				tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
				currency,
				min_price       : Number(min_price) || eachitem?.min_price,
			};
		}
		return null;
	}).filter((eachitem) => !!eachitem) || [];
};

const formatFirstLineItem = ({ lineItems, values }) => {
	const [firstItem] = lineItems || [];
	const quantity = Number(values?.chargeable_weight) || firstItem.quantity;
	const tax_price = (Number(values?.price
					|| NUMBER_FALLBACK) * (firstItem.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
	return [
		{
			...firstItem,
			quantity,
			price           : Number(values.price) || NUMBER_FALLBACK,
			total_price     : Number(values.price || NUMBER_FALLBACK) * (quantity || MINIMUM_PRICE),
			tax_price,
			tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
			currency        : values?.currency,
		},
	];
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
