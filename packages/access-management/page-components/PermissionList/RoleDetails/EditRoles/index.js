import { Button, Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useEditRole from '../../../../hooks/useEditRole';

import Edit from './edit';
import styles from './styles.module.css';

function EditRoleModal({ roleData, getRole }) {
	const { t } = useTranslation(['accessManagement']);

	const [show, setShow] = useState(false);

	const {
		controls,
		formProps,
		handleSubmit,
		editRoleApi,
		editRole,
	} = useEditRole({ roleData, setShow, getRole });

	const onClick = () => {
		setShow(true);
	};

	const onOuterClick = () => {
		setShow(false);
	};

	return (
		<section>
			<Button size="md" onClick={() => onClick()}>
				<IcMEdit style={{ marginRight: 5 }} size={1.2} />
				{t('accessManagement:roles_and_permission_update_role_edit_button')}
			</Button>

			<Modal
				show={show}
				position="basic"
				onClose={() => setShow(false)}
				onOuterClick={onOuterClick}
				className={styles.modal_container}
			>
				<Modal.Header
					title={(<h2>{t('accessManagement:roles_and_permission_update_edit_role_heading')}</h2>)}
				/>
				<form onSubmit={handleSubmit(editRole)}>
					<Modal.Body>
						<Edit
							controls={controls}
							formProps={formProps}
							roleData={roleData}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							type="submit"
							disabled={editRoleApi.loading}
							id="edit_role_btn"
						>
							{editRoleApi.loading
								? t('accessManagement:roles_and_permission_update_role_updateing_button')
								: t('accessManagement:roles_and_permission_update_role_update_button')}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</section>
	);
}

export default EditRoleModal;
