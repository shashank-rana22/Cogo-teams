import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import chargeControl from './charge-controls';

const TrailerControls = ({ data, charge_code_name }) => {
	const locationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'] } },
	}));
	const controls = [
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
