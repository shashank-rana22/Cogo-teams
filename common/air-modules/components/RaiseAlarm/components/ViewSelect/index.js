import { RadioGroup } from '@cogoport/components';

const OPTIONS = [
	{
		label : 'KAM',
		value : 'okam',
	},
	{
		label : 'Service Ops',
		value : 'service_ops2',
	},
];

function ViewSelect({ value = '', setValue = () => {} }) {
	return (
		<div>
			<RadioGroup
				options={OPTIONS}
				value={value}
				onChange={setValue}
			/>
		</div>
	);
}

export default ViewSelect;
