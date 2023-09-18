import React from 'react';
import useForm from '@cogoport/front//hooks/useFormCogo';
import { Button } from '@cogoport/front/components/admin';
import oceanControls from '../../configurations/controls-ocean';
import ContainerFormat from './Containers';
import useGetContainerData from '../../hooks/useGetContainerData';
import { BillContainer, FormContainer, Submit, SearchValue } from './style';

const Form = ({
	refetch,
	showUpdate,
	setShowUpdate,
	isDisabled = false,
	shipping_line_id = '',
}) => {
	const {
		fields,
		handleSubmit,
		watch,
		reset,
		setValues,
		formState: { errors },
	} = useForm(oceanControls({ isDisabled, shipping_line_id }));

	const { onSubmit } = useGetContainerData({ reset, refetch });

	const handleData = (data) => {
		onSubmit(data, showUpdate, setShowUpdate);
	};

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(handleData)}>
				<Submit>
					<SearchValue>
						Search Value : {showUpdate?.data?.search_value}
					</SearchValue>
					<Button type="submit">Submit</Button>
				</Submit>
				<BillContainer />
				<ContainerFormat
					{...fields.containers}
					watch={watch}
					error={errors?.containers}
					showUpdate={showUpdate}
					setValues={setValues}
				/>
			</form>
		</FormContainer>
	);
};

export default Form;
