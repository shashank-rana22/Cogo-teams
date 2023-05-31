import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import lclChildControls from './lcl-child-controls';

const LclFields = () => {
	const countryOptions1 = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country', 'seaport'] } },
	}));
	const countryOptions2 = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country', 'seaport'] } },
	}));

	const control =	[
		{
			name        : 'service_provider_id',
			type        : 'select',
			label       : 'Service Provider Fcl Freight',
			placeholder : 'Select Service Provider',
			span        : 4,
			rules       : {
				required: { value: true, message: 'Service Provider is required' },
			},
		},
		{
			name        : 'sourced_by_id',
			placeholder : 'Rate Provided by User',
			type        : 'select',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		{
			label : 'Origin Country/Port Pair',
			name  : 'origin_port_id',
			span  : 4,
			type  : 'select',
			...countryOptions1,
		},
		{
			label : 'Destination Country/Port Pair',
			name  : 'destination_port_id',
			span  : 4,
			type  : 'select',
			...countryOptions2,
		},
		{
			name        : 'validity_start',
			type        : 'date_picker',
			label       : 'Validity Start',
			placeholder : 'Select Validity Start',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		{
			name        : 'validity_end',
			type        : 'date_picker',
			label       : 'Validity End',
			placeholder : 'Select Validity End',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		{
			name        : 'departure_dates',
			type        : 'departure_date',
			label       : 'Departure Dates',
			span        : 4,
			placeholder : 'Enter Departure Dates',
			className   : 'primary sm',
			datePair    : {},
			rules       : { required: 'This is required' },
		},
		{
			name        : 'number_of_stops',
			type        : 'number',
			label       : 'Enter No Of Stops',
			placeholder : 'Enter No. of Stops',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		{
			name        : 'transit_time',
			type        : 'number',
			label       : 'Enter Transit Time',
			placeholder : 'Enter Transit time (days)',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		lclChildControls({ heading: '', charge_code_name: 'freights_charge_codes' }),
	];
	return control;
};

export default LclFields;
