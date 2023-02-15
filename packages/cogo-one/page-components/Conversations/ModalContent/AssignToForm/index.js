import { useForm, RadioGroupController, SelectController, InputController } from '@cogoport/forms';

import controls from '../../../../configurations/assign-form-controls';

import styles from './styles.module.css';

function AssignToForm() {
	const { handleSubmit, control, watch } = useForm();
	const { assign_to, assign_user, assign_condition, condition_value } = controls;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Assign</div>
			<div className={styles.controller_div}>
				<RadioGroupController control={control} {...assign_to} />
			</div>
			<div className={styles.controller_div}>
				<InputController control={control} {...assign_user} />
			</div>
			<div className={styles.controller_div}>
				<SelectController control={control} {...assign_condition} />
			</div>
		</div>
	);
}
export default AssignToForm;
