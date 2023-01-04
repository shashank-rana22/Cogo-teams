import { Modal, Button } from '@cogoport/components';
import React from 'react';

import Heading from '../../../common/Heading';

import CreateRole from './CreateRole';
import styles from './CreateRole/styles.module.css';

function CreateRoleModal({
	showCreateRoleModal = false,
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	if (!showCreateRoleModal) return null;

	const onChange = () => {
		onChangeShowCreateRoleModal(false);
	};

	return (
		<Modal className={styles.modal_container} show={showCreateRoleModal} onClose={onChange} placement="top">
			<Modal.Header title={(
				<Heading
					title="Create Role"
					subTitle="Set role name and role description"
				/>
			)}
			/>
			<Modal.Body>
				<CreateRole
					onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
					redirect={redirect}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CreateRoleModal;
