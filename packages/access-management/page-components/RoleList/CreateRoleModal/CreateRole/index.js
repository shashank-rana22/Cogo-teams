import React from 'react';

import Heading from '../../../../common/Heading';

import Form from './components/Form';
import useCreateRole from './hooks/useCreateRole';
import { Container, HeadingContainer } from './styles';

function CreateRole({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) {
	const {
		controls, formProps, errors, onSubmit, onErrors, createRoleApi,
	} =		useCreateRole({ onChangeShowCreateRoleModal, redirect });

	return (
		<Container id="rnp_role_list_create_role_container">
			<HeadingContainer id="rnp_role_list_create_role_heading_container">
				<Heading
					title="Create Role"
					subTitle="Set role name and role description"
				/>
			</HeadingContainer>

			<Form
				controls={controls}
				formProps={formProps}
				errors={errors}
				onSubmit={onSubmit}
				onErrors={onErrors}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				createRoleApi={createRoleApi}
			/>
		</Container>
	);
}

export default CreateRole;
