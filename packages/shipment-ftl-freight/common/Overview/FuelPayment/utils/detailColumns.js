import { startCase } from '@cogoport/utils';

export const detailColumns = ({ fuelPaymentItem = {}, service = {} }) => {
	const {
		virtual_card_number = '',
		mobile_number = '',
		vendor = '',
		card_limit = '',
	} = fuelPaymentItem || {};

	const details = [
		{
			key   : 'virtual_card_number',
			label : 'Virtual Card Number',
			value : virtual_card_number,
		},
		{
			key   : 'truck_number',
			label : 'Truck Number',
			value : service?.truck_number,
		},
		{
			key   : 'contact_number',
			label : 'Contact Number',
			value : mobile_number,
		},
		{
			key   : 'vendor',
			label : 'Vendor',
			value : startCase(vendor),
		},
		{
			key   : 'card_limit',
			label : 'Amount Allowed',
			value : card_limit,
		},
	];

	return details;
};
