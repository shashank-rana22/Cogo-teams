import { Radio, Button } from '@cogoport/components';
import {
	useForm,
	RadioGroupController,
	SelectController,
	InputController,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsListAgents } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../../../configurations/assign-form-controls';

import styles from './styles.module.css';

function AssignToForm({ data = {} }) {
	const { assignLoading, assignChat = () => {} } = data || {};
	const listAgentsOptions = useGetAsyncOptions(
		merge(asyncFieldsListAgents()),
	);
	const PLACEHOLDER_MAPPING = {
		shipment_id    : 'Select SID',
		invoice        : 'Enter Invoice No',
		onboarding_kyc : 'Enter Pan No',
	};
	const [isAssignUser, setIsAssignUser] = useState(true);
	const { handleSubmit, control, watch, reset, formState:{ errors } } = useForm({ allow_user: 'observe' });
	const { assign_user, assign_condition, condition_value, allow_user } = controls;
	const watchCondtion = watch('assign_condition') || null;
	const createSubmit = (val) => {
		let payload;
		if (isAssignUser) {
			payload = {
				agent_id           : val?.assign_user,
				is_allowed_to_chat : val?.allow_user === 'observe_and_chat',
			};
		} else {
			payload = {
				condition: {
					type : val?.assign_condition,
					data : val?.condition_value,
				},
				is_allowed_to_chat: val?.allow_user === 'observe_and_chat',
			};
		}
		assignChat(payload);
	};

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
					<SelectController
						control={control}
						{...assign_user}
						{...listAgentsOptions}
					/>
					{errors?.assign_user && <div className={styles.error_text}>This is Required</div>}
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
						<SelectController
							control={control}
							{...assign_condition}
						/>
					</div>

					{watchCondtion && (
						<div className={styles.styled_controller}>
							<InputController
								control={control}
								{...condition_value}
								placeholder={
                                    PLACEHOLDER_MAPPING[watchCondtion] || ''
                                }
							/>
							{errors?.condition_value && <div className={styles.error_text}>This is Required</div>}
						</div>
					)}
				</>
			)}
			<div className={styles.allowed_div}>
				<div className={styles.label}>Allow the user to</div>
				<div>
					<RadioGroupController control={control} {...allow_user} />
				</div>
			</div>
			<div className={styles.button_container}>
				<Button size="md" themeType="tertiary" onClick={reset}>
					reset
				</Button>
				<Button size="md" themeType="accent" loading={assignLoading} onClick={handleSubmit(createSubmit)}>
					Assign
				</Button>
			</div>
		</div>
	);
}
export default AssignToForm;
