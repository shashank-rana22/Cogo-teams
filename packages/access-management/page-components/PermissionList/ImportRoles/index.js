import { Select, Modal, Button, MultiSelect } from '@cogoport/components';
import React from 'react';

import useImportRoles from '../../../hooks/useImportRoles';

import Priority from './Priority';
import styles from './styles.module.css';

function ImportRoles({ show, onClose, onSubmit = () => {} }) {
	const {
		handleSubmit,
		setFormvalues,
		setView,
		setOptions,
		formValues,
		submitText,
		view,
		options,
		partnerOptions,
		partnerRoleOptions,
	} = useImportRoles({ onSubmit });
	return (
		<Modal
			show={show}
			onClose={view === 'priority' ? () => setView('import') : onClose}
			handleSubmit={handleSubmit}
			scroll={false}
			className={styles.modal_container}
		>
			<Modal.Header title={(<h3>Import Roles</h3>)} />
			<Modal.Body>
				<div className="disclaimer">
					<h3>Disclaimer</h3>
					<span>
						Please note that importing roles will only prefill permissions into
						the navigations. You still need to go to each navigation and save
						them
					</span>
				</div>
				{view === 'import' ? (
					<div className={styles.partner_roles}>
						<h4>Select Partner</h4>
						<Select
							{...partnerOptions}
							placeholder="Select Partner"
							value={formValues.partner_id}
							onChange={(val) => setFormvalues({ ...formValues, partner_id: val })}
							isClearable
						/>
						{formValues?.partner_id ? (
							<div className={styles.partner_roles}>
								<h4>Select Partner Roles</h4>
								<MultiSelect
									{...partnerRoleOptions}
									value={formValues.role_ids}
									onChange={(val, roles) => {
										setFormvalues({ ...formValues, role_ids: val });
										setOptions(roles);
									}}
								/>
							</div>
						) : null}
					</div>
				) : (
					<Priority
						value={formValues?.role_ids}
						options={options}
						setPriority={(ids) => setFormvalues({ ...formValues, role_ids: ids })}
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px' }}
					size="md"
					themeType="secondary"
					onClick={view === 'priority' ? () => setView('import') : onClose}
				>
					Cancel
				</Button>
				<Button size="md" themeType="primary" onClick={handleSubmit}>{submitText}</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ImportRoles;
