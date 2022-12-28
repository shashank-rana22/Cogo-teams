import { format } from '@cogoport/utils';

const getRows = ({ key, details }) => {
	let response = null;
	const rows = [];

	if (details) {
		const data = details[key];

		if (data) {
			if (key === 'single_booking_notes') {
				(data || []).forEach((element) => {
					const row = [];
					row.push(element?.operator?.business_name || '');
					row.push(`${element?.containers_count} X ${element?.container_size}`);
					row.push(
						`${element?.charges?.line_items?.[0]?.currency} ${element?.charges?.line_items?.[0]?.price}`,
					);
					row.push(format(element?.bn_expiry, 'dd MMM yyyy'));
					row.push(
						format(element?.schedule_departure, 'dd MMM yyyy'),
					);
					row.push(element?.booking_party || '');
					rows.push({ rowData: row, id: element?.id });
				});
				response = rows;
			} else if (
				key === 'splitable_booking_notes'
				|| key === 'mergeable_booking_notes'
			) {
				const keyArrMapping = {
					splitable_booking_notes : [],
					mergeable_booking_notes : [],
				};

				(Object.keys(data) || []).forEach((datakey) => {
					const childrens = [];
					const ids = [];

					let containers = '';
					let total_buy_price = 0;
					const currency =						data[datakey][0].charges.line_items[0].currency || 'INR';
					(data[datakey] || []).forEach((child, index) => {
						if (data[datakey].length - 1 === index) {
							containers += `${child.containers_count} Ft X ${child.container_size} Ft`;
						} else {
							containers += `${child.containers_count} Ft X ${child.container_size} Ft, `;
						}
						total_buy_price += Number(child.charges.line_items[0].price || 0);
					});

					(data[datakey] || []).forEach((child) => {
						const row = [];
						row.push(child?.operator?.business_name || '');
						row.push(containers);
						row.push(`${currency} ${total_buy_price}` || 'NA');
						row.push(format(child?.bn_expiry, 'dd MMM yyyy'));
						row.push(
							format(child?.schedule_departure, 'dd MMM yyyy'),
						);
						row.push(child?.booking_party);
						childrens.push(row);
						ids.push(child?.id);
					});
					let stringID = '';
					(ids || []).forEach((id, index) => {
						if (index === 0) {
							stringID += `${id}`;
						} else {
							stringID += `:${id}`;
						}
					});

					keyArrMapping[key].push({
						id    : stringID,
						allid : ids,
						childrens,
						total : childrens.length,
					});
				});
				response = keyArrMapping[key];
			}
		}
	}

	return { rows: response };
};
export default getRows;
