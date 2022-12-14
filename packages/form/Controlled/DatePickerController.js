import { Datepicker } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function DatePickerController(props) {
	const { methods, name, label = '' } = props;
	const { control } = methods;
	console.log(methods, 'd');

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					{label ? <label>{label}</label> : null}
					<Datepicker {...field} />
				</div>
			)}
		/>
	);
}
export default DatePickerController;
