import { Radio, Button } from '@cogoport/components';
import { useForm, RadioGroupController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import controls, { ASSIGN_TYPE_OPTIONS } from '../../../../../../configurations/assign-form-controls';
import useGetOmnichannelAgentTypes from '../../../../../../hooks/useGetOmnichannelAgentTypes';

import { GetAssignTypeComp, ASSIGN_TYPE_PAYLOAD_MAPPING } from './getAssignTypeHelpers';
import styles from './styles.module.css';

const DEFAULT_ASSIGN_TYPE = 'assign_user';

function AssignToForm({
	data = {},
	assignLoading = false,
	viewType = '',
}) {
	const [assignType, setAssignType] = useState(DEFAULT_ASSIGN_TYPE);

	const {
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
		resetField,
	} = useForm(
		{
			defaultValues: {
				allow_user       : 'observe_and_chat',
				assign_condition : 'shipment',
				assign_entity    : GLOBAL_CONSTANTS.country_entity_ids.IN,
			},
		},
	);

	const watchAgentType = watch('agent_type') || null;

	const { options = [] } = useGetOmnichannelAgentTypes();

	const { assignChat = () => {}, support_agent_id = null, accountType = '' } = data || {};

	const { allow_user } = controls;
	const watchCondition = watch('assign_condition') || null;

	const resetForm = () => {
		reset({
			allow_user       : 'observe_and_chat',
			assign_condition : 'shipment',
		});
	};

	const createSubmit = (val) => {
		const getPayload = ASSIGN_TYPE_PAYLOAD_MAPPING[assignType];

		return assignChat({ payload: getPayload?.(val) || {} });
	};

	return (
		<form
			className={styles.container}
			onSubmit={handleSubmit(createSubmit)}
		>
			{ASSIGN_TYPE_OPTIONS.map(
				(eachAssignOption) => {
					const {
						label = '',
						value = '',
					} = eachAssignOption;

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
							{isChecked && (
								<GetAssignTypeComp
									control={control}
									errors={errors}
									watchCondition={watchCondition}
									assignType={assignType}
									accountType={accountType}
									options={options}
									viewType={viewType}
									watchAgentType={watchAgentType}
									resetField={resetField}
								/>
							)}
						</div>
					);
				},
			)}

			{support_agent_id && (
				<div className={styles.allowed_div}>
					<div className={styles.label}>
						Allow the user to
					</div>

					<div>
						<RadioGroupController
							control={control}
							{...allow_user}
						/>
					</div>
				</div>
			)}

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="tertiary"
					disabled={assignLoading}
					onClick={resetForm}
				>
					reset
				</Button>
				<Button
					size="md"
					themeType="accent"
					loading={assignLoading}
					type="submit"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default AssignToForm;
