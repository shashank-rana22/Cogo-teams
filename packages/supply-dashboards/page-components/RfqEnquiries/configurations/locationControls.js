import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import chargeControl from './charge-controls';

const LocationControls = ({ data }) => {
	const locationOptions1 = useGetAsyncOptions(merge(asyncFieldsLocations()));
	const locationOptions2 = useGetAsyncOptions(merge(asyncFieldsLocations()));
	const control = [
		{
			name        : 'origin_location_id',
			type        : 'select',
			...locationOptions1,
			label       : 'Origin Location',
			span        : 4,
			key         : 'origin_location_id',
			placeholder : 'Select',
			value       : data?.origin_location_id || '',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'destination_location_id',
			type        : 'select',
			label       : 'Destination Location',
			span        : 4,
			placeholder : 'Select',
			key         : 'destination_location_id',
			...locationOptions2,
			value       : data?.destination_location_id || '',
			rules       : { required: 'This is required' },
		},
		chargeControl({ heading: '', charge_code_name: 'freights_charge_codes', service: 'ftl' }),
	];
	return control;
};

export default LocationControls;
