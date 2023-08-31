import { Chips, MultiSelect } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

const through_criteria = {
	supply: [
		'supply_agent_view',
		'supply_team_members_view',
		'margin_approval_manager_view',
		'margin_approval_manager_team_members_view',
	],
	sales      : ['sales_agent_view', 'sales_team_members_view'],
	operations : [
		'booking_agent_view',
		'booking_team_members_view',
		'customer_service_agent_view',
		'customer_service_team_members_view',
		'operations_agent',
		'operations_team_members_view',
	],
	finance: [
		'business_assesment_agent_view',
		'business_assesment_team_members_view',
		'finance_assesment_agent_view',
		'finance_assesment_team_members_view',
	],
	channel_partner: ['entity_manager_view', 'entity_manager_team_members_view'],
};

const getThroughCriteria = (item) => {
	const ALL_TC = [];
	(item || []).forEach((key) => {
		ALL_TC.push(...through_criteria[key]);
	});
	return ALL_TC;
};

const getDepartment = (item) => {
	const ALL_DEPARTMENTS = [];
	Object.keys(through_criteria)?.forEach((key) => {
		if (through_criteria[key].filter((tc) => item.includes(tc)).length > GLOBAL_CONSTANTS.zeroth_index) {
			ALL_DEPARTMENTS.push(key);
		}
	});
	return ALL_DEPARTMENTS;
};

function Departments({ onChange = () => {}, selectedDepartments = {} }) {
	const { t } = useTranslation(['accessManagement']);
	const OPTIONS_Select = [
		{
			label : t('accessManagement:roles_and_permission_allow'),
			value : 'allowed',
		},
		{
			label : t('accessManagement:roles_and_permission_self'),
			value : 'self',
		},
		{
			label : t('accessManagement:roles_and_permission_team'),
			value : 'team',
		},
		{
			label : t('accessManagement:roles_and_permission_all'),
			value : 'all',
		},
		{
			label : t('accessManagement:roles_and_permission_across_all'),
			value : 'across_all',
		},
		{
			label : t('accessManagement:roles_and_permission_channel_partner'),
			value : 'channel_partner',
		},
		{
			label : t('accessManagement:roles_and_permission_channel_partner_team'),
			value : 'channel_partner_team',
		},
	];

	const OPTIONS = [
		{
			children : t('accessManagement:roles_and_permission_update_edit_role_role_functions_supply'),
			key      : 'supply',
		},
		{
			children : t('accessManagement:roles_and_permission_update_edit_role_role_functions_sales'),
			key      : 'sales',
		},
		{
			children : t('accessManagement:roles_and_permission_update_edit_role_role_functions_operations'),
			key      : 'operations',
		},
		{
			children : t('accessManagement:roles_and_permission_update_edit_role_role_functions_finance'),
			key      : 'finance',
		},
		{
			children : t('accessManagement:roles_and_permission_pills_channel_partner'),
			key      : 'channel_partner',
		},
	];
	return (
		<section>
			<h4>{t('accessManagement:roles_and_permission_department_description_access_type_scopes')}</h4>
			<MultiSelect
				placeholder={
					t('accessManagement:roles_and_permission_department_description_access_type_scopes_placeholder')
				}
				value={selectedDepartments.scopes}
				onChange={(val) => onChange({ scopes: val })}
				options={OPTIONS_Select}
				style={{ marginBottom: '8px' }}
			/>
			<span>
				{t('accessManagement:roles_and_permission_access_type_allows_description')}
			</span>
			<div style={{ marginTop: '20px' }}>
				<h4>{t('accessManagement:roles_and_permission_department_description_label')}</h4>
				<Chips
					className={styles.chips}
					items={OPTIONS}
					selectedItems={getDepartment(selectedDepartments.through_criteria || [])}
					onItemChange={(item) => onChange({ through_criteria: getThroughCriteria(item) })}
					enableMultiSelect
				/>
			</div>
			<span>
				{t('accessManagement:roles_and_permission_department_description')}
				{' '}
			</span>
		</section>
	);
}

export default Departments;
