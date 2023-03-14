import { startCase } from '@cogoport/front/utils';
import formatDate from '@cogo/globalization/utils/formatDate';

export const indentRows = (services = []) => {
	const {
		consignee_details = {},
		consignor_details = {},
		stuffing_point = '',
		origin_location = {},
		destination_location = {},
		cargo_weight_per_container = 0,
		containers_count = 0,
		cargo_readiness_date = '',
		source_transportation_by = '',
		mode_of_delivery_at_destination = '',
		destination_transportation_by = '',
		customer_payment_terms = '',
	} = services[0] ?? {};

	const rows = [
		{
			key: '1) Name and Address of Consignor',
			value: `${consignor_details.name_of_consignor}, ${consignor_details.address_of_consignor}`,
			className: 'line',
		},
		{
			key: '2) Stuffing Point',
			value: `${startCase(stuffing_point)}, ${origin_location.display_name}`,
			className: 'line',
		},
		{
			key: '3) Contact Person',
			value: consignor_details.contact_consignor,
			className: 'line',
		},
		{
			key: '4) Name and Address of Consignee',
			value: `${consignee_details.name_of_consignee}, ${consignee_details.address_of_consignee}`,
			className: 'line',
		},
		{
			key: '5) Contact Person at Destination',
			value: '',
			className: 'empty',
			isMain: true,
		},
		{
			key: 'Name',
			value: consignee_details.name_of_consignee,
			className: 'line',
			isSubType: true,
		},
		{
			key: 'Tel/ Fax',
			value: consignee_details.contact_consignee,
			className: 'line',
			isSubType: true,
		},
		{
			key: '6) Destination',
			value: destination_location.display_name,
			className: 'line',
		},
		{
			key: '7) No of Packages and Description',
			value: '',
			className: 'line',
		},
		{
			key: '8) Cargo Weight',
			value: cargo_weight_per_container,
			className: 'line',
		},
		{
			key: '9) No of Containers Required',
			value: containers_count,
			className: 'line',
		},
		{
			key: '10) Date of Stuffing',
			value: cargo_readiness_date
				? formatDate({
						date: cargo_readiness_date,
						formatType: 'dateTime',
						separator: ', ',
				  })
				: '',
			className: 'line',
		},
		{
			key: '11) Stuffing Point',
			value: 'Terminal/ Factory/ Chassis',
			className: 'empty-box',
			boxValue: startCase(stuffing_point),
		},
		{
			key: '12) Source Transportation by',
			value: 'Private/ CONCOR',
			className: 'empty-box',
			boxValue: startCase(source_transportation_by),
		},
		{
			key: '13) Carting Details',
			value: '',
			className: 'empty',
			isMain: true,
		},
		{
			key: 'A) Date Of Arrival of Cargo',
			value: '',
			className: 'line',
			isSubType: true,
		},
		{
			key: 'B) No of Trucks',
			value: '',
			className: 'line',
			isSubType: true,
		},
		{
			key: '14) Mode of Delivery at Destination',
			value: 'Terminal/ Factory/ Chassis',
			className: 'empty-box',
			boxValue: startCase(mode_of_delivery_at_destination),
		},
		{
			key: '15) Destination Transported By',
			value: 'Private/ CONCOR',
			className: 'empty-box',
			boxValue: startCase(destination_transportation_by),
		},
		{
			key: '16) Payment Mode',
			value: 'Pay/ To-pay',
			className: 'empty-box',
			boxValue: customer_payment_terms === 'prepaid' ? 'Pay' : 'To-pay',
		},
	];

	return rows;
};
