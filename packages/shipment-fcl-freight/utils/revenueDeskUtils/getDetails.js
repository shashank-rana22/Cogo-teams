import getMinRate from './getMinRate';
import getRateAndCurrency from './getRateAndCurrency';

const getDetails = ({ bookingItem = {}, idx = 0 }) => {
	const { source, data: all_data } = bookingItem;
	const data = all_data?.[idx];

	const data_to_show = {
		buy_rate         : '',
		is_reverted_rate : false,
		is_rate_expired  : null,
	};

	if (['single', 'splitable', 'mergeable'].includes(bookingItem?.type)) {
		const line_item = data?.charges?.line_items?.[0];
		data_to_show.buy_rate = `${line_item?.currency}  ${line_item?.price}`;
	}
	if (source === 'system_rate') {
		if (data?.validities) {
			const { minimumRate, currency, is_rate_expired } = getMinRate(
				data?.validities,
			);
			data_to_show.buy_rate = `${currency || ''} ${minimumRate || ''}`;
			data_to_show.is_rate_expired = is_rate_expired;
		}
	}
	if (source === 'flash_booking') {
		if (data?.line_items) {
			const { rate, currency, is_rate_expired } = getRateAndCurrency(
				data?.line_items,
			);
			data_to_show.buy_rate = `${currency || ''} ${rate || ''}`;
			data_to_show.is_reverted_rate = true;
			data_to_show.is_rate_expired = is_rate_expired;
		}
	}

	data_to_show.shipping_line = data?.operator?.business_name || data?.shipping_line?.business_name || '';
	data_to_show.supplier_name = data?.service_provider?.business_name || '';
	data_to_show.sailing_date = data?.schedule_departure || '';

	return data_to_show;
};

export default getDetails;
