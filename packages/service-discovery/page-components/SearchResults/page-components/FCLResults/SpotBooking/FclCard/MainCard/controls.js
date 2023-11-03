import { addDays } from '@cogoport/utils';

import validate from './validateNumber';

export const fclControls = ({ shippingLineOptions = [] }) => {
	const controls = [
		{
			name        : 'shipping_line_id',
			label       : 'Shipping Line',
			type        : 'select',
			className   : 'primary sm',
			placeholder : 'Select Shipping Line',
			options     : shippingLineOptions || true,
			caret       : true,
			rules       : {
				required: 'Shipping Line is required',
			},
		},
		{
			label                 : 'Departure',
			name                  : 'departure',
			type                  : 'datepicker',
			placeholder           : 'Departure',
			minDate               : addDays(new Date(), 4),
			isPreviousDaysAllowed : true,
			rules                 : { required: 'Departure is Required' },
		},
		{
			name        : 'number_of_stops',
			label       : 'Number of Stops',
			type        : 'text',
			placeholder : 'Enter number of stops',
			size        : 'sm',
			rules       : { required: 'No. of Stops are Required', validate: (val) => validate(val) },
		},
		{
			name                  : 'arrival',
			label                 : 'Arrival',
			placeholder           : 'Arrival',
			minDate               : addDays(new Date(), 4),
			isPreviousDaysAllowed : true,
			type                  : 'datepicker',
			rules                 : { required: 'Arrival is Required' },
		},
	];

	return controls;
};
