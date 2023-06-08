import { Radio, Button } from '@cogoport/components';
import {
	useForm,
	RadioGroupController,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsListAgents } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls, { ASSIGN_TYPE_OPTIONS } from '../../../../../../configurations/assign-form-controls';

import { getAssignTypeComp, ASSIGN_TYPE_PAYLOAD_MAPPING } from './getAssignTypeHelpers';
import styles from './styles.module.css';

const DEFAULT_ASSIGN_TYPE = 'assign_user';

function AssignToForm({ data = {}, assignLoading = false }) {
	const [assignType, setAssignType] = useState(DEFAULT_ASSIGN_TYPE);
	const { handleSubmit, control, watch, reset, formState: { errors } } = useForm({
		defaultValues: {
			allow_user       : 'observe_and_chat',
			assign_condition : 'shipment',
		},
	});

	const { assignChat = () => { }, support_agent_id = null } = data || {};

	const listAgentsOptions = useGetAsyncOptions(
		merge(asyncFieldsListAgents(), { params: { filters: { status: 'active' } } }),
	);

	const resetForm = () => {
		reset({
			allow_user       : 'observe_and_chat',
			assign_condition : 'shipment',
		});
	};

	const { allow_user } = controls;

	const watchCondtion = watch('assign_condition') || null;

	const createSubmit = (val) => {
		const getPayload = ASSIGN_TYPE_PAYLOAD_MAPPING[assignType];
		assignChat(getPayload?.(val) || {});
	};

	const assignTypeComp = getAssignTypeComp({
		control,
		listAgentsOptions,
		errors,
		watchCondtion,
		assignType,
	});

	return (
		<form className={styles.container} onSubmit={handleSubmit(createSubmit)}>
			{ASSIGN_TYPE_OPTIONS.map((eachAssignOption) => {
				const { label = '', value = '' } = eachAssignOption;
				const isChecked = value === assignType;
				return (
					<div key={value}>
						<div className={styles.controller_div}>
							<Radio
								name={value}
								label={label}
								key={value}
								onChange={() => setAssignType(value)}
								checked={isChecked}
							/>
						</div>
						{isChecked && assignTypeComp}
					</div>
				);
			})}

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
