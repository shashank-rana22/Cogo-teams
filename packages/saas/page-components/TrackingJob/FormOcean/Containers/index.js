import React, { useEffect } from 'react';
import { useFieldArray } from '@cogoport/front/hooks';
import { IcMPlus } from '@cogoport/icons-react';
import Container from './Container';
import {
	Containers,
	Head,
	ButtonContainer,
	Card,
	StyledButton,
} from './styles';

const ContainerFormat = ({
	name,
	control,
	controls,
	error,
	setValue,
	watch,
	showElements = {},
	buttonText,
	showUpdate,
	setValues,
}) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name,
	});
	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = '';
	});

	useEffect(() => {
		if (showUpdate?.data?.container_no?.length === 0) {
			append(childEmptyValues);
		}
	}, []);

	useEffect(() => {
		if (showUpdate?.data?.container_no?.length > 0) {
			setValues({
				containers: (showUpdate?.data?.container_no || []).map((val) => ({
					container_no: val,
				})),
			});
		}
	}, [showUpdate?.data?.container_no]);

	return (
		<Containers className={`form-fieldArray-${name}`}>
			{fields.map((field, index) => (
				<div key={field.id}>
					<Card id={field.id}>
						<Head>{`Container ${index + 1}`}</Head>
						<Container
							id={field.id}
							watch={watch}
							field={field}
							setValue={setValue}
							index={index}
							control={control}
							controls={controls}
							name={name}
							remove={remove}
							error={error?.[index]}
							showElements={showElements?.[index]}
							buttonText={buttonText}
						/>
					</Card>
				</div>
			))}

			{showUpdate?.data?.search_type === 'BOOKING_NO/BL_NO' && (
				<ButtonContainer>
					<StyledButton onClick={() => append(childEmptyValues)}>
						<IcMPlus width={14} height={14} />
						Add Container
					</StyledButton>
				</ButtonContainer>
			)}
		</Containers>
	);
};
export default ContainerFormat;
