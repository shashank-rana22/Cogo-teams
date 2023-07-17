import { cl } from '@cogoport/components';
import { SelectController, InputController, AsyncSelectController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import controls from '../../../../../../configurations/assign-form-controls';
import { PLACEHOLDER_MAPPING } from '../../../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';

import styles from './styles.module.css';

function AssignUsers({
	control = {},
	assignUser = {},
	errors = {},
	agentType = {},
	viewType = '',
	options = [],
	watchAgentType = '',
	resetField = () => {},
}) {
	return (
		<div className={styles.flex_div}>
			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.agent_type_filter && (
				<div className={styles.styled_controller}>
					<SelectController
						control={control}
						{...agentType}
						options={options}
						isClearable
						onChange={() => {
							resetField('assign_user');
						}}
					/>
				</div>
			)}
			<div className={styles.styled_controller} key={watchAgentType}>
				<AsyncSelectController
					control={control}
					{...assignUser}
					asyncKey="list_chat_agents"
					isClearable
					key={watchAgentType}
					initialCall
					params={{
						filters: {
							status            : 'active',
							common_agent_type : getCommonAgentType({ viewType }) || undefined,
							agent_type        : watchAgentType || undefined,
						},
					}}
					className={errors?.assign_user ? styles.error_class : ''}
					renderLabel={(item) => (
						<div>
							<div className={styles.agent_label}>
								{startCase(item.name)}
							</div>
							<div className={styles.lower_label}>
								{startCase(item?.agent_type)}
							</div>
						</div>
					)}
				/>
				<div className={styles.error_text}>{errors?.assign_user && 'This is Required'}</div>
			</div>
		</div>
	);
}

function ShipmentInvoice({
	control = {},
	assignCondition = {},
	watchCondtion = {},
	errors = {},
	conditionValue = {},
}) {
	return (
		<>
			<div className={styles.styled_controller}>
				<SelectController
					control={control}
					{...assignCondition}
				/>
			</div>
			{watchCondtion && (
				<div
					className={cl`${styles.styled_controller} ${errors?.condition_value ? styles.error_class : ''}`}
				>
					<InputController
						control={control}
						{...conditionValue}
						placeholder={PLACEHOLDER_MAPPING[watchCondtion] || ''}
					/>
					<div className={styles.error_text}>{errors?.condition_value && 'This is Required'}</div>
				</div>
			)}
		</>
	);
}

function Entity({
	control = {},
	assignEntity = {}, errors = {}, assignRole = {}, accountType = '',
	assignServiceType = {},
}) {
	return (
		<>
			<div className={styles.styled_controller}>
				<SelectController
					control={control}
					{...assignEntity}
				/>
				<div className={styles.error_text}>{errors?.assign_entity && 'This is Required'}</div>
			</div>
			<div className={styles.styled_controller}>
				<SelectController
					control={control}
					{...assignRole}
				/>
				<div className={styles.error_text}>{errors?.assign_role && 'This is Required'}</div>
			</div>
			{accountType === 'service_provider' && (
				<div className={styles.styled_controller}>
					<SelectController
						control={control}
						{...assignServiceType}
					/>
				</div>
			)}
		</>
	);
}

const COMPONENT_MAPPPING = {
	assign_user                : AssignUsers,
	assign_on_shipment_invoice : ShipmentInvoice,
	assign_on_entity           : Entity,
};

export function GetAssignTypeComp({
	control = {},
	errors = {},
	watchCondtion = '',
	assignType = '',
	accountType = '',
	viewType = '',
	options = [],
	watchAgentType = '',
	resetField = () => {},
}) {
	const {
		assign_user,
		assign_condition,
		condition_value,
		assign_role,
		assign_entity,
		assign_service_type,
		agent_type,
	} = controls;

	const COMPONENT_PROPS_MAPPING = {
		assign_user: {
			assignUser : assign_user,
			agentType  : agent_type,
			viewType,
			options,
			watchAgentType,
			resetField,
		},
		assign_on_shipment_invoice: {
			assignCondition : assign_condition,
			watchCondtion,
			conditionValue  : condition_value,
		},
		assign_on_entity: {
			assignEntity      : assign_entity,
			assignRole        : assign_role,
			accountType,
			assignServiceType : assign_service_type,
		},
	};

	const Component = COMPONENT_MAPPPING[assignType] || null;

	if (!Component) {
		return null;
	}

	return (
		<Component
			{...(COMPONENT_PROPS_MAPPING[assignType] || {})}
			control={control}
			errors={errors}
		/>
	);
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
