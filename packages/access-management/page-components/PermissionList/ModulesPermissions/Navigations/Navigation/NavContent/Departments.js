import React from 'react';
import { Pills, Select, Popover } from '@cogoport/front/components';
import {
	StyledModal,
	StyledPara,
	Label,
	DisclaimerLabel,
	InfoContent,
} from './styles';

const OPTIONS = [
	{
		label: 'Supply',
		value: 'supply',
	},
	{
		label: 'Sales',
		value: 'sales',
	},
	{
		label: 'Operations',
		value: 'operations',
	},
	{
		label: 'Finance',
		value: 'finance',
	},
	{
		label: 'Channel Partner',
		value: 'channel_partner',
	},
];

const OPTIONS_Select = [
	{
		label: 'Allow',
		value: 'allowed',
	},
	{
		label: 'Self',
		value: 'self',
	},
	{
		label: 'Team',
		value: 'team',
	},
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Across All',
		value: 'across_all',
	},

	{
		label: 'Channel Partner',
		value: 'channel_partner',
	},
	{
		label: 'Channel Partner Team',
		value: 'channel_partner_team',
	},
];

const through_criteria = {
	supply: [
		'supply_agent_view',
		'supply_team_members_view',
		'margin_approval_manager_view',
		'margin_approval_manager_team_members_view',
	],
	sales: ['sales_agent_view', 'sales_team_members_view'],
	operations: [
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
	const allTC = [];
	(item || []).forEach((key) => {
		allTC.push(...through_criteria[key]);
	});
	return allTC;
};

const getDepartment = (item) => {
	const allDepartments = [];
	Object.keys(through_criteria).forEach((key) => {
		if (through_criteria[key].filter((tc) => item.includes(tc)).length > 0) {
			allDepartments.push(key);
		}
	});
	return allDepartments;
};

const scopesContent = (
	<div style={{ display: 'flex', flexDirection: 'column', width: '360px' }}>
		<InfoContent>
			<span className="bold">Allow:</span> Allow data access data{' '}
		</InfoContent>
		<InfoContent>
			<span className="bold">Self:</span> Access own data{' '}
		</InfoContent>
		<InfoContent>
			<span className="bold">Team:</span> Access own team Data
		</InfoContent>
		<InfoContent>
			<span className="bold">All:</span> Access current partners data
		</InfoContent>
		<InfoContent>
			<span className="bold">Across All:</span> Access all partners data
		</InfoContent>
		<InfoContent>
			<span className="bold">Channel Partner:</span>
			Access channel partners data in which he/she is Key Account Manager
		</InfoContent>
		<InfoContent>
			<span className="bold">Channel Partner Team:</span>
			Access channel partners team data in which he/she is Key Account Manager
		</InfoContent>
	</div>
);

const Departments = ({ onChange = () => {}, selectedDepartments = {} }) => {
	return (
		<StyledModal>
			<StyledPara>
				<Label>Access types (scopes)</Label>
				<Select
					placeholder="Choose type"
					style={{
						marginBottom: 8,
						background: '#FFFFFF',
						paddingLeft: '20px',
						display: 'flex',
						justifyContent: 'space-between',
						boxShadow: '0px 4px 14px rgba(193, 193, 193, 0.25)',
						borderRadius: '5px',
					}}
					value={selectedDepartments.scopes}
					onChange={(val) => onChange({ scopes: val })}
					options={OPTIONS_Select}
					multiple
				/>
			</StyledPara>
			<DisclaimerLabel>
				<span>
					Access type allows this role too see data in different formats. For
					e.g. if you are selecting team, role will be able to see their team
					memebers data in that navigation.{' '}
					<Popover
						content={scopesContent}
						theme="light"
						interactive
						trigger="mouseenter"
					>
						<span style={{ color: 'blue', cursor: 'pointer' }}>
							See more...
						</span>
					</Popover>
				</span>
			</DisclaimerLabel>
			<StyledPara>
				<Label>Departments</Label>
				<Pills
					options={OPTIONS}
					value={getDepartment(selectedDepartments.through_criteria || [])}
					onChange={(item) =>
						onChange({ through_criteria: getThroughCriteria(item) })
					}
					multiple
				/>
			</StyledPara>
			<DisclaimerLabel>
				Department allow this role too see data via different criterias in a
				particular scope. For e.g If you have selected sales then role will be
				able to see data in which they are tagged as sales owner or team members
				data in which their team members are tagged as sales owner{' '}
			</DisclaimerLabel>
		</StyledModal>
	);
};

export default Departments;
