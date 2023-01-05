import React from 'react';

import Form from './components/Form';
import styles from './styles.module.css';

function CreateRole({
	onChangeShowCreateRoleModal = () => {},
	formProps = {},
	controls = () => [],
	createRoleApi = {},
}) {
	return (
		<section className={styles.section} id="rnp_role_list_create_role_container">
			<Form
				controls={controls}
				formProps={formProps}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				createRoleApi={createRoleApi}
			/>
		</section>
	);
}

export default CreateRole;
