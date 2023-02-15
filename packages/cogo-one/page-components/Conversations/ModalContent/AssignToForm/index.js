import { useForm, RadioGroupController, SelectController, InputController } from '@cogoport/forms';

import controls from '../../../../configurations/assign-form-controls';

function AssignToForm() {
	const { handleSubmit, control, watch } = useForm();
	const { assign_to, assign_user, assign_condition, condition_value } = controls;
	return (
		<div>
			<div>Assign</div>
			<div>
				<RadioGroupController control={control} {...assign_to} />
			</div>
			<div>
				<InputController control={control} {...assign_user} />
			</div>
			<div>
				<SelectController control={control} {...assign_condition} />
			</div>
		</div>
	);
}
export default AssignToForm;
