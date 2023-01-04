import { Portal } from '@cogoport/components';
import React from 'react';

import useCreateRole from '../../../../hooks/useCreateRole';

import Form from './components/Form';
import styles from './styles.module.css';

function CreateRole({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	const {
		controls, formProps, onSubmit, createRoleApi,
	} =	useCreateRole({ onChangeShowCreateRoleModal, redirect });

	return (
		<section className={styles.section} id="rnp_role_list_create_role_container">
			<Form
				controls={controls}
				formProps={formProps}
				onSubmit={onSubmit}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				createRoleApi={createRoleApi}
			/>
		</section>
	);
}

export default CreateRole;
