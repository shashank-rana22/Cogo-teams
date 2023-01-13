import { Select, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import Priority from './Priority';
import {
	Heading,
	Row,
	Label,
	SelectBox,
	DisclaimerLabel,
	DisclaimerText,
} from './styles';

function ImportRoles({ show, onClose, onSubmit = () => {} }) {
	const [formValues, setFormvalues] = useState({});
	const [view, setView] = useState('import'); // import/priority
	const [options, setOptions] = useState([]);
	const hashedOptions = {};
	options.forEach((role) => {
		const hashedRole = {};
		(role.permissions || []).forEach((permission) => {
			hashedRole[`${permission.navigation}:${permission.resource_name}`] =				permission;
		});
		hashedOptions[role.id] = hashedRole;
	});
	const handleSubmit = () => {
		if (view === 'import') {
			if (options.length > 1) {
				setView('priority');
			} else {
				const [firstRoleId] = formValues?.role_ids || [];
				const permissions =	options.find((role) => role.id === firstRoleId)?.permissions || [];
				onSubmit(permissions);
			}
		} else {
			const [firstRoleId, ...rest] = formValues?.role_ids || [];
			const permissions =	options.find((role) => role.id === firstRoleId)?.permissions || [];
			const takenPermissions = Object.keys(hashedOptions[firstRoleId]);
			rest.forEach((id) => {
				const hashedRole = hashedOptions[id] || {};
				const remainigPermissions = Object.keys(hashedRole).filter(
					(key) => !takenPermissions.includes(key),
				);
				const permissionsToTake = remainigPermissions.map(
					(item) => hashedRole[item],
				);
				permissions.push(...permissionsToTake);
				takenPermissions.push(...remainigPermissions);
			});
			onSubmit(permissions);
		}
	};

	const headerContent = () => (
		<div>
			<Heading>Import Roles</Heading>
		</div>
	);

	let submitText = 'Import';
	if (options.length > 1 && view === 'import') {
		submitText = 'Assign Priority';
	}

	return (
		<Modal
			show={show}
			onClose={view === 'priority' ? () => setView('import') : onClose}
			headerContent={headerContent}
			handleSubmit={handleSubmit}
			submitText={submitText}
			isScollable={false}
		>
			<div style={{ padding: '22px' }}>
				<Row className="disclaimer">
					<DisclaimerLabel>Disclaimer</DisclaimerLabel>
					<DisclaimerText>
						Please note that importing roles will only prefill permissions into
						the navigations. You still need to go to each navigation and save
						them
					</DisclaimerText>
				</Row>
				{view === 'import' ? (
					<Row>
						<SelectBox className="full">
							<Label>Select Partner</Label>
							<Select
								value={formValues.partner_id}
								optionsListKey="partners"
								selectType="pills"
								onChange={(val) => setFormvalues({ ...formValues, partner_id: val })}
								isClearable
							/>
						</SelectBox>
						<SelectBox className="full">
							{formValues?.partner_id ? (
								<>
									<Label>Select Partner Roles</Label>
									<Select
										value={formValues.role_ids}
										optionsListKey="partner-roles"
										selectType="pills"
										valueKey="id"
										labelKey="name"
										onChange={(val, roles) => {
											setFormvalues({ ...formValues, role_ids: val });
											setOptions(roles);
										}}
										multiple
										params={{
											filters: {
												stakeholder_type : 'partner',
												stakeholder_id   : formValues?.partner_id,
											},
											page_limit: 10,
										}}
									/>
								</>
							) : null}
						</SelectBox>
					</Row>
				) : (
					<Priority
						value={formValues?.role_ids}
						options={options}
						setPriority={(ids) => setFormvalues({ ...formValues, role_ids: ids })}
					/>
				)}
			</div>
		</Modal>
	);
}
export default ImportRoles;
