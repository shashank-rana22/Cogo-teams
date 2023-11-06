import useGetMainPortsOptions from '../hooks/useGetMainPortsOptions';

import fclChildControls from './charge-controls';

const useFclLocalFields = ({ data }) => {
	const mainPortOptions = useGetMainPortsOptions({ location_id: data?.data?.port_id });

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
			name        : 'main_port_id',
			type        : 'select',
			...mainPortOptions,
			label       : 'Main Port',
			span        : 4,
			placeholder : 'Select',
			rules       : { required: 'This is required' },
		},
		fclChildControls({ heading: '', charge_code_name: 'freights_charge_codes' }),
	];
	return control;
};

export default useFclLocalFields;
