import React from 'react';

import useCreateRole from '../../../../hooks/useCreateRole';

import Form from './components/Form';
import styles from './styles.module.css';

function CreateRole({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	const {
		controls, formProps, errors, onSubmit, onErrors, createRoleApi,
	} =	useCreateRole({ onChangeShowCreateRoleModal, redirect });

	return (
		<section className={styles.section} id="rnp_role_list_create_role_container">
			<Form
				controls={controls}
				formProps={formProps}
				errors={errors}
				onSubmit={onSubmit}
				onErrors={onErrors}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				createRoleApi={createRoleApi}
			/>
		</section>
	);
}

export default CreateRole;
