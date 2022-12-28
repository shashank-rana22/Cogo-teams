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

	return (
		<Modal size="lg" show={showCreateRoleModal} onClose={onChangeShowCreateRoleModal} placement="center">
			<Modal.Header title={(
				<div className={styles.heading_container} id="rnp_role_list_create_role_heading_container">
					<Heading
						title="Create Role"
						subTitle="Set role name and role description"
					/>
				</div>
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
