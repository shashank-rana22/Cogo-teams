import React, { useEffect } from 'react';
import { useFieldArray } from '@cogoport/front/hooks';
import { IcMPlus } from '@cogoport/icons-react';
import Location from './Location';
import { Container, ButtonContainer, Head, Card, StyledButton } from './styles';

const LocationFormat = ({
	name,
	control,
	controls,
	error,
	types,
	watch,
	showElements = {},
	milestones_error,
	buttonText,
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
		append(childEmptyValues);
	}, []);

	return (
		<Container className={`form-fieldArray-${name}`}>
			{fields.map((field, index) => (
				<div key={field.id}>
					<Card id={field.id}>
						<Head>{`Location ${index + 1}`}</Head>
						<Location
							{...field}
							id={field.id}
							types={types}
							watch={watch}
							field={field}
							index={index}
							milestones_error={milestones_error}
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
			<ButtonContainer>
				<StyledButton onClick={() => append(childEmptyValues)}>
					<IcMPlus width={14} height={14} />
					Add Location
				</StyledButton>
			</ButtonContainer>
		</Container>
	);
};
export default LocationFormat;
