import { Modal, Button } from '@cogoport/components';
import React from 'react';

import Heading from '../../../common/Heading';
import useCreateRole from '../../../hooks/useCreateRole';

import CreateRole from './CreateRole';
import styles from './CreateRole/styles.module.css';

function CreateRoleModal({
	showCreateRoleModal = false,
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	const onChange = () => {
		onChangeShowCreateRoleModal(false);
	};

	const {
		controls, formProps, onSubmit, createRoleApi,
	} =	useCreateRole({ onChangeShowCreateRoleModal, redirect });

	const { handleSubmit } = formProps;
	const { loading } = createRoleApi;

	return (
		<Modal
			scroll={false}
			size="lg"
			className={styles.modal_container}
			show={showCreateRoleModal}
			onClose={onChange}
			placement="center"
		>
			<Modal.Header
				title={(
					<Heading
						title="Create Role"
						subTitle="Set role name and role description"
					/>
				)}
			/>
			<form
				id="rnp_role_list_create_role_form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Modal.Body>
					<CreateRole
						onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
						redirect={redirect}
						formProps={formProps}
						controls={controls}
						createRoleApi={createRoleApi}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={onChange}
					>
						Cancel
					</Button>
					<Button
						size="md"
						loading={loading}
						type="submit"
					>
						Create
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default CreateRoleModal;
