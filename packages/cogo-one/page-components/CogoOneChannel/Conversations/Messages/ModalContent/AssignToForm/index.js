import { Radio, Button, cl } from '@cogoport/components';
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
import { PLACEHOLDER_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function AssignToForm({ data = {}, assignLoading = false }) {
	const { assignChat = () => {}, support_agent_id = null } = data || {};

	const listAgentsOptions = useGetAsyncOptions(
		merge(asyncFieldsListAgents(), { params: { filters: { status: 'active' } } }),
	);

	const [isAssignUser, setIsAssignUser] = useState(true);

	const { handleSubmit, control, watch, reset, formState:{ errors } } = useForm({
		defaultValues: {
			allow_user       : 'observe_and_chat',
			assign_condition : 'shipment',
		},
	});
	const resetForm = () => {
		reset({
			allow_user       : 'observe_and_chat',
			assign_condition : 'shipment',
		});
	};
	const { assign_user, assign_condition, condition_value, allow_user } = controls;

	const watchCondtion = watch('assign_condition') || null;

	const createSubmit = (val) => {
		let payload;
		if (isAssignUser) {
			payload = {
				agent_id           : val?.assign_user,
				is_allowed_to_chat : val?.allow_user !== 'observe',
			};
		} else {
			payload = {
				condition: {
					type : val?.assign_condition,
					data : val?.condition_value,
				},
				is_allowed_to_chat: val?.allow_user !== 'observe',
			};
		}
		assignChat(payload);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(createSubmit)}>
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
						isClearable
						className={errors?.assign_user && styles.error_class}
					/>
					<div className={styles.error_text}>{errors?.assign_user && 'This is Required'}</div>
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
						<div className={cl`${styles.styled_controller}
						 ${errors?.condition_value && styles.error_class}`}
						>
							<InputController
								control={control}
								{...condition_value}
								placeholder={
                                    PLACEHOLDER_MAPPING[watchCondtion] || ''
                                }

							/>
							<div className={styles.error_text}>{errors?.condition_value && 'This is Required'}</div>
						</div>
					)}
				</>
			)}
			{support_agent_id && (
				<div className={styles.allowed_div}>
					<div className={styles.label}>Allow the user to</div>
					<div>
						<RadioGroupController control={control} {...allow_user} />
					</div>
				</div>
			)}
			<div className={styles.button_container}>
				<Button size="md" themeType="tertiary" onClick={resetForm}>
					reset
				</Button>
				<Button
					size="md"
					themeType="accent"
					loading={assignLoading}
					type="submit"
				>
					Assign
				</Button>
			</div>

		</form>
	);
}
export default AssignToForm;
