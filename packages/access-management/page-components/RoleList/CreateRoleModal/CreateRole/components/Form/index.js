import React from 'react';
import InputController from '@cogo/business-modules/form/components/Controlled/InputController';
import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import {
	FormContainer,
	Row,
	Col,
	FormGroup,
	FormLabel,
	InputGroup,
	ErrorMessage,
	ButtonContainerCol,
	BackButton,
	AddButton,
} from './styles';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		default:
			return null;
	}
};

const Form = ({
	controls = () => [],
	formProps = {},
	errors = {},
	onSubmit = () => {},
	onErrors = () => {},
	onChangeShowCreateRoleModal = () => {},
	createRoleApi = {},
}) => {
	const { handleSubmit, fields } = formProps;

	return (
		<FormContainer
			id="rnp_role_list_create_role_form"
			onSubmit={handleSubmit(onSubmit, onErrors)}
		>
			<Row>
				{controls?.map((control) => {
					const Element = getElementController(control.type);

					if (!Element) return null;

					return (
						<Col xs="12" sm="12" md={control.span}>
							<FormGroup>
								<FormLabel>{control?.label}</FormLabel>
								<InputGroup>
									<Element
										id={`rnp_role_list_create_role_form_${controls?.name}_input`}
										{...fields?.[control?.name]}
									/>
									<ErrorMessage>
										{errors?.[control?.name]?.message}
									</ErrorMessage>
								</InputGroup>
							</FormGroup>
						</Col>
					);
				})}

				<ButtonContainerCol xs="12">
					<BackButton
						id="rnp_role_list_create_role_form_back_button"
						type="button"
						onClick={() => onChangeShowCreateRoleModal(false)}
					>
						Back
					</BackButton>

					<AddButton
						id="rnp_role_list_create_role_form_submit_button"
						type="submit"
						disabled={createRoleApi?.loading}
					>
						Add
					</AddButton>
				</ButtonContainerCol>
			</Row>
		</FormContainer>
	);
};

export default Form;
