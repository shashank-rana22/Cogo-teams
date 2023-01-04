import { Chips, MultiSelect } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{
		children : 'Supply',
		key      : 'supply',
	},
	{
		children : 'Sales',
		key      : 'sales',
	},
	{
		children : 'Operations',
		key      : 'operations',
	},
	{
		children : 'Finance',
		key      : 'finance',
	},
	{
		children : 'Channel Partner',
		key      : 'channel_partner',
	},
];

const OPTIONS_Select = [
	{
		label : 'Allow',
		value : 'allowed',
	},
	{
		label : 'Self',
		value : 'self',
	},
	{
		label : 'Team',
		value : 'team',
	},
	{
		label : 'All',
		value : 'all',
	},
	{
		label : 'Across All',
		value : 'across_all',
	},

	{
		label : 'Channel Partner',
		value : 'channel_partner',
	},
	{
		label : 'Channel Partner Team',
		value : 'channel_partner_team',
	},
];

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
	console.log('item', item);
	const allTC = [];
	(item || []).forEach((key) => {
		allTC.push(...through_criteria[key]);
	});
	return allTC;
};

const getDepartment = (item) => {
	const allDepartments = [];
	Object.keys(through_criteria)?.forEach((key) => {
		if (through_criteria[key].filter((tc) => item.includes(tc)).length > 0) {
			allDepartments.push(key);
		}
	});
	return allDepartments;
};

function Departments({ onChange = () => {}, selectedDepartments = {} }) {
	return (
		<section>
			<h4>Access types (scopes)</h4>
			<MultiSelect
				placeholder="Choose type"
				value={selectedDepartments.scopes}
				onChange={(val) => onChange({ scopes: val })}
				options={OPTIONS_Select}
				style={{ marginBottom: '8px' }}
			/>
			<span>
				Access type allows this role too see data in different formats. For
				e.g. if you are selecting team, role will be able to see their team
				memebers data in that navigation.
			</span>
			<div style={{ marginTop: '20px' }}>
				<h4>Departments</h4>
				<Chips
					className={styles.chips}
					items={OPTIONS}
					selectedItems={getDepartment(selectedDepartments.through_criteria || [])}
					onItemChange={(item) => onChange({ through_criteria: getThroughCriteria(item) })}
					enableMultiSelect
				/>
			</div>
			<span>
				Department allow this role too see data via different criterias in a
				particular scope. For e.g If you have selected sales then role will be
				able to see data in which they are tagged as sales owner or team members
				data in which their team members are tagged as sales owner
				{' '}
			</span>
		</section>
	);
}

export default Departments;
