import useGetMainPortsOptions from '../hooks/useGetMainPortsOptions';

import chargeControl from './charge-controls';

const TrailerControls = ({ data, charge_code_name }) => {
	const mainPortOptions1 = useGetMainPortsOptions({ location_id: data?.data?.origin_location_id });
	const mainPortOptions2 = useGetMainPortsOptions({ location_id: data?.data?.destination_location_id });

	const controls = [
		{
			name        : 'origin_main_port_id',
			type        : 'select',
			...mainPortOptions1,
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
			...mainPortOptions2,
			rules       : { required: 'This is required' },
		},
		{
			name    : 'haulage_type',
			type    : 'select',
			label   : 'Haulage Type',
			span    : 4,
			options : [{
				label : 'Carrier',
				value : 'carrier',
			}, {
				label : 'Merchant',
				value : 'merchant',
			}],
			value       : data?.data?.haulage_type,
			placeholder : 'Select haulage type',
			rules       : { required: 'This is required' },
		},
		{
			name    : 'transportation_modes',
			type    : 'select',
			label   : 'Transportation Modes',
			span    : 4,
			options : [{
				label : 'Rail',
				value : 'rail',
			}, {
				label : 'Barge',
				value : 'barge',
			}],
			placeholder : 'Select Transportation Modes',
			rules       : { required: 'This is required' },
		},
		chargeControl({ heading: '', charge_code_name, service: 'trailer' }),
	];
	return controls;
};

export default TrailerControls;
