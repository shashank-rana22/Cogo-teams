import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import fclChildControls from './charge-controls';

const FclFields = () => {
	const locationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'] } },
	}));
	const control = [
		{
			name        : 'rate_reference_number',
			type        : 'text',
			label       : 'Rate Reference Number',
			placeholder : 'Type rate reference Number here',
			span        : 4,
		},
		{
			name            : 'booking_rate_procurement_proof',
			label           : 'Booking rate procurement proof',
			span            : 4,
			type            : 'file',
			themeType       : 'secondary',
			drag            : true,
			uploadIcon      : 'ic-upload',
			onlyURLOnChange : true,
			accept          : 'image/*,.pdf,.doc,.docx',
			uploadType      : 'aws',
		},
		{
			name        : 'origin_main_port_id',
			type        : 'select',
			...locationOptions,
			label       : 'Origin Main Port',
			span        : 4,
			placeholder : 'Select',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'destination_main_port_id',
			type        : 'select',
			label       : 'Destination Main Port',
			span        : 4,
			placeholder : 'Select',
			...locationOptions,
			rules       : { required: 'This is required' },
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
		fclChildControls({ heading: '', charge_code_name: 'freights_charge_codes' }),
	];
	return control;
};

export default FclFields;
