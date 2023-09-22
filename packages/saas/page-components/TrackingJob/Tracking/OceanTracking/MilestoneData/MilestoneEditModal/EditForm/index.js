import FormLayout from '@cogo/business-modules/form/Layout';
import useForm from '@cogoport/front//hooks/useFormCogo';
import { Button } from '@cogoport/front/components/admin';
import React from 'react';

import editOceanControls from '../../../../../../configurations/edit-details';
import useEditContainerMilestones from '../../../../../../hooks/useEditContainerMilestones';

import { ButtonContainer, FormContainer } from './styles';

function EditForm({
	editDetail = {},
	getMilestones,
	setEditModal,
	shipping_line_id,
}) {
	const controls = editOceanControls({ editDetail, shipping_line_id });
	const {
		fields,
		handleSubmit,
		formState: { errors },
	} = useForm(controls);

	const { updateMilestoneData } = useEditContainerMilestones(
		editDetail?.id,
		getMilestones,
	);
	const handleData = (data) => {
		updateMilestoneData(data);
	};

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(handleData)}>
				<FormLayout
					fields={fields}
					controls={controls}
					errors={errors}
					themeType="admin"
				/>
				<ButtonContainer>
					<Button
						type="button"
						className="secondary"
						onClick={() => setEditModal(false)}
					>
						CANCEL
					</Button>
					<Button type="submit">Update</Button>
				</ButtonContainer>
			</form>
		</FormContainer>
	);
}

export default EditForm;
