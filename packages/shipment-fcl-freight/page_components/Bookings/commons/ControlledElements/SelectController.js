import { Select } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function SelectController(props) {
	const {
		options, name = '', methods, label, placeholder,
	} = props;
	const { control } = methods;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (

				<div>
					{label ? <label>{label}</label> : null}
					<Select {...field} options={options} placeholder={placeholder} />
				</div>

			)}

		/>
	);
}
export default SelectController;
