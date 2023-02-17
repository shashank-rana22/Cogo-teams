import { Radio, Button } from '@cogoport/components';
import { useForm, RadioGroupController, SelectController, InputController } from '@cogoport/forms';
import { useState } from 'react';

import controls from '../../../../../../configurations/assign-form-controls';

import styles from './styles.module.css';

function AssignToForm() {
	const PLACEHOLDER_MAPPING = {
		shipment_id    : 'Select SID',
		invoice        : 'Enter Invoice No',
		onboarding_kyc : 'Enter Pan No',
	};
	const [isAssignUser, setIsAssignUser] = useState(true);
	const { handleSubmit, control, watch } = useForm();
	const { assign_user, assign_condition, condition_value, allow_user } = controls;
	const watchCondtion = watch('assign_condition') || null;
	return (
		<div className={styles.container}>
			<div className={styles.controller_div}>
				<Radio
					name="assign_user"
					label="Assign user"
					onChange={() => setIsAssignUser(true)}
					checked={isAssignUser}
				/>
			</div>
			{isAssignUser && (
				<div className={styles.styled_controller}>
					<InputController control={control} {...assign_user} />
				</div>
			)}
			<div className={styles.controller_div}>
				<Radio
					name="assign_condition"
					label="Assign Condition"
					onChange={() => setIsAssignUser(false)}
					checked={!isAssignUser}
				/>
			</div>
			{!isAssignUser && (
				<>
					<div className={styles.styled_controller}>
						<SelectController control={control} {...assign_condition} />
					</div>
					{watchCondtion && (
						<div className={styles.styled_controller}>
							<InputController
								control={control}
								{...condition_value}
								placeholder={PLACEHOLDER_MAPPING[watchCondtion] || ''}
							/>
						</div>
					)}
				</>
			)}
			<div className={styles.allowed_div}>
				<div className={styles.label}>
					Allow the user to
				</div>
				<div>
					<RadioGroupController control={control} {...allow_user} />
				</div>
			</div>
			<div className={styles.button_container}>
				<Button size="md" themeType="tertiary">cancel</Button>
				<Button size="md" themeType="accent">Assign</Button>

			</div>
		</div>
	);
}
export default AssignToForm;
