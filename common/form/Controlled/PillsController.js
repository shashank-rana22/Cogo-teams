import { Pills } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function PillsController(props) {
	const {
		methods, name = '', label = '', list,
	} = props;
	const { control } = methods;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					{label ? <label>{label}</label> : null}
					<Pills {...field} list={list} />
				</div>
			)}
		/>
	);
}

export default PillsController;
