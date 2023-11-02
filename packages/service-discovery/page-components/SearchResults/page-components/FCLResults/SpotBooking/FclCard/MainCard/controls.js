import { addDays } from '@cogoport/utils';

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
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			label       : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			placeholder : 'Departure',
			className   : 'primary sm',
			minDate     : addDays(new Date(), 4),
			span        : 6,
			rules       : { required: 'Required' },
		},
		{
			name        : 'number_of_stops',
			label       : 'Number of Stops',
			type        : 'number',
			placeholder : 'Enter number of stops',
			className   : 'primary sm',
			span        : 6,
			rules       : { required: 'Required', min: 0 },
		},
		{
			name        : 'arrival',
			label       : 'Arrival',
			placeholder : 'Arrival',
			minDate     : addDays(new Date(), 4),
			type        : 'datepicker',
			className   : 'primary sm',
			span        : 6,
			rules       : { required: 'Required' },
		},
	];

	return controls;
};
