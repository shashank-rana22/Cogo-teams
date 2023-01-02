import FormLayout from '@cogo/app-search/common/FormElement';
import React from 'react';

import useEditRole from '../../../../hooks/useEditRole';

import {
	Container, Heading, ButtonDiv, EditButton,
} from './styles';

function Edit({ roleData, onClose, getRole }) {
	const {
		controls,
		onError,
		formProps,
		errors,
		handleSubmit,
		editRoleApi,
		editRole,
	} = useEditRole({ roleData, onClose, getRole });

	return (
		<Container>
			<Heading>Edit Role </Heading>
			<form onSubmit={handleSubmit(editRole, onError)}>
				<FormLayout
					controls={controls}
					fields={formProps.fields}
					errors={errors}
					formValues={{}}
				/>
				<ButtonDiv>
					<EditButton
						type="submit"
						disabled={editRoleApi.loading}
						id="edit_role_btn"
					>
						{editRoleApi.loading ? 'Updating Role ' : 'Update Role'}
					</EditButton>
				</ButtonDiv>
			</form>
		</Container>
	);
}
export default Edit;
