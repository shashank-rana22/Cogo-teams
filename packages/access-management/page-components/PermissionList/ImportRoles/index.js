import { Select, Modal, Button, MultiSelect } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useImportRoles from '../../../hooks/useImportRoles';

import Priority from './Priority';
import styles from './styles.module.css';

function ImportRoles({ show, onClose, onSubmit = () => {} }) {
	const { t } = useTranslation(['accessManagement']);
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
		isImportingRole,
	} = useImportRoles({ onSubmit });
	return (
		<Modal
			show={show}
			onClose={view === 'priority' ? () => setView('import') : onClose}
			handleSubmit={handleSubmit}
			scroll={false}
			className={styles.modal_container}
		>
			<Modal.Header title={(
				<h3>
					{t('accessManagement:roles_and_permission_permission_list_import_roles_heading')}
				</h3>
			)}
			/>
			<Modal.Body>
				<div className="disclaimer">
					<h3>{t('accessManagement:roles_and_permission_permission_list_import_roles_disclainer')}</h3>
					<span>
						{t('accessManagement:roles_and_permission_permission_list_import_roles_description')}
					</span>
				</div>
				{view === 'import' ? (
					<div className={styles.partner_roles}>
						<h4>
							{t('accessManagement:roles_and_permission_permission_list_import_roles_select_partner')}
						</h4>
						<Select
							{...partnerOptions}
							placeholder={
								t('accessManagement:roles_and_permission_permission_list_import_roles_select_partner')
							}
							value={formValues.partner_id}
							onChange={(val) => setFormvalues({ ...formValues, partner_id: val })}
							isClearable
						/>
						{formValues?.partner_id ? (
							<div className={styles.partner_roles}>
								<h4>
									{
							t('accessManagement:roles_and_permission_permission_list_import_roles_select_partner_role')
									}
								</h4>
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
					{t('accessManagement:roles_and_permission_permission_list_import_roles_select_cancel_button')}
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit}
					loading={isImportingRole}
				>
					{submitText}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default ImportRoles;
