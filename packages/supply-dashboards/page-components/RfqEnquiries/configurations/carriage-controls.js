import lclChildControlsFunc from './lcl-child-controls';

const carriageControls = ({
	range,
}) => {
	const controls = [
		{
			name        : 'cutoff_dates',
			type        : 'departure-dates',
			span        : 4,
			placeholder : 'Enter Departure Dates',
			className   : 'primary sm',
			datePair    : {
				startDate : range?.startDate,
				endDate   : range?.endDate,
			},
			rules: { required: 'This is required' },
		},
		{
			name        : 'transit_time',
			type        : 'number',
			placeholder : 'Enter Transit time (days)',
			className   : 'primary lg',
			span        : 2,
			rules       : { required: 'This is required' },
		},
		lclChildControlsFunc(),
	];

	return controls;
};

export default carriageControls;
