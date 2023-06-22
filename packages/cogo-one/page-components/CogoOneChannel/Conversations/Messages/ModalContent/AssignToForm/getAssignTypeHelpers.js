import { cl } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';

import controls from '../../../../../../configurations/assign-form-controls';
import { PLACEHOLDER_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

export function GetAssignTypeComp({
	control,
	listAgentsOptions, errors, watchCondtion, assignType, accountType = '',
}) {
	const {
		assign_user,
		assign_condition,
		condition_value,
		assign_role,
		assign_entity,
		assign_service_type,
	} = controls;

	const ASSIGN_TYPE_MAPPING = {
		assign_user: (
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
		),
		assign_on_shipment_invoice: (
			<>
				<div className={styles.styled_controller}>
					<SelectController
						control={control}
						{...assign_condition}
					/>
				</div>
				{watchCondtion && (
					<div
						className={cl`${styles.styled_controller} ${errors?.condition_value && styles.error_class}`}
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
			</>),
		assign_on_entity: (
			<>
				<div className={styles.styled_controller}>
					<SelectController
						control={control}
						{...assign_entity}
					/>
					<div className={styles.error_text}>{errors?.assign_entity && 'This is Required'}</div>
				</div>
				<div className={styles.styled_controller}>
					<SelectController
						control={control}
						{...assign_role}
					/>
					<div className={styles.error_text}>{errors?.assign_role && 'This is Required'}</div>
				</div>
				{accountType === 'service_provider' && (
					<div className={styles.styled_controller}>
						<SelectController
							control={control}
							{...assign_service_type}
						/>
					</div>
				)}
			</>),
	};
	return ASSIGN_TYPE_MAPPING[assignType] || null;
}

export const ASSIGN_TYPE_PAYLOAD_MAPPING = {
	assign_user: (val) => ({
		agent_id           : val?.assign_user,
		is_allowed_to_chat : val?.allow_user !== 'observe',
	}),

	assign_on_shipment_invoice: (val) => ({
		condition: {
			type : val?.assign_condition,
			data : val?.condition_value,
		},
		is_allowed_to_chat: val?.allow_user !== 'observe',
	}),

	assign_on_entity: (val) => ({
		cogo_entity_id     : val?.assign_entity,
		agent_type         : val?.assign_role,
		is_allowed_to_chat : val?.allow_user !== 'observe',
		service_type       : val?.assign_service_type || undefined,
	}),

};
