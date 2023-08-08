import getGeoConstants from '@cogoport/globalization/constants/geo';
import { format } from '@cogoport/utils';

import { DECREMENT_BY_ONE, DEFAULT_INDEX, VALUE_ZERO } from '../../../../../constants';

const getRows = ({ key, details }) => {
	const geo = getGeoConstants();
	let response = null;
	const ROWS = [];

	if (details) {
		const data = details[key];

		if (data) {
			if (key === 'single_booking_notes') {
				(data || []).forEach((element) => {
					const ROW = [];
					const lineItem = element?.charges?.line_items?.[DEFAULT_INDEX];
					ROW.push(element?.operator?.business_name || '');
					ROW.push(`${element?.containers_count} X ${element?.container_size}`);
					ROW.push(
						`${lineItem?.currency} ${lineItem?.price}`,
					);
					ROW.push(
						format(element?.bn_expiry, 'dd MMM yyyy'),
					);
					ROW.push(
						format(element?.schedule_departure, 'dd MMM yyyy'),
					);
					ROW.push(element?.booking_party || '');
					ROWS.push({ rowData: ROW, id: element?.id });
				});
				response = ROWS;
			} else if (
				key === 'splitable_booking_notes'
				|| key === 'mergeable_booking_notes'
			) {
				const keyArrMapping = {
					splitable_booking_notes : [],
					mergeable_booking_notes : [],
				};

				(Object.keys(data) || []).forEach((datakey) => {
					const CHILDRENS = [];
					const IDS = [];

					let containers = '';
					let total_buy_price = 0;
					const currency = data[datakey][DEFAULT_INDEX].charges.line_items[DEFAULT_INDEX].currency
						|| geo.country.currency.code;
					(data[datakey] || []).forEach((child, index) => {
						if (data[datakey].length - DECREMENT_BY_ONE === index) {
							containers += `${child.containers_count} Ft X ${child.container_size} Ft`;
						} else {
							containers += `${child.containers_count} Ft X ${child.container_size} Ft, `;
						}
						total_buy_price += Number(child.charges.line_items[DEFAULT_INDEX].price || VALUE_ZERO);
					});

					(data[datakey] || []).forEach((child) => {
						const ROW = [];
						ROW.push(child?.operator?.business_name || '');
						ROW.push(containers);
						ROW.push(`${currency} ${total_buy_price}` || 'NA');
						ROW.push(
							format(child?.bn_expiry, 'dd MMM yyyy'),
						);
						ROW.push(
							format(child?.schedule_departure, 'dd MMM yyyy'),
						);
						ROW.push(child?.booking_party || '-----');
						CHILDRENS.push(ROW);
						IDS.push(child?.id);
					});
					let stringID = '';
					(IDS || []).forEach((id, index) => {
						if (index === VALUE_ZERO) {
							stringID += `${id}`;
						} else {
							stringID += `:${id}`;
						}
					});

					keyArrMapping[key].push({
						id        : stringID,
						allid     : IDS,
						childrens : CHILDRENS,
						total     : CHILDRENS.length,
					});
				});
				response = keyArrMapping[key];
			}
		}
	}

	return { rows: response };
};
export default getRows;
