import React, { useEffect } from 'react';
import { useFieldArray } from '@cogoport/front/hooks';
import { IcMPlus } from '@cogoport/icons-react';
import Milestone from './Milestone';
import {
	Container,
	Title,
	Card,
	ButtonContainer,
	StyledButton,
} from './styles';

const MilestoneFormat = ({
	name,
	control,
	controls,
	error,
	watch,
	milestoneName,
	index: indexnumber,
	indexnumber: locationNumber,
	showElements = {},
	buttonText,
}) => {
	const milesname = `${milestoneName}`;
	const { fields, append, remove } = useFieldArray({
		control,
		name: milesname,
	});
	const childEmptyValues = {};
	useEffect(() => {
		append(childEmptyValues);
	}, []);
	return (
		<Container className={`form-fieldArray-${name}`}>
			{fields.map((field, index) => (
				<div key={field.id}>
					<Card id={field.id}>
						<Title>{`Milestone ${index + 1}`}</Title>
						<Milestone
							watch={watch}
							key={field.id}
							field={field}
							index={index}
							indexnumber={indexnumber}
							locationNumber={locationNumber}
							control={control}
							controls={controls}
							name={name}
							remove={remove}
							error={error?.[index]}
							showElements={showElements?.[index]}
							buttonText={buttonText}
							milesname={milesname}
						/>
					</Card>
				</div>
			))}
			<ButtonContainer>
				<StyledButton onClick={() => append(childEmptyValues)}>
					<IcMPlus width={14} height={14} />
					Add Milestone
				</StyledButton>
			</ButtonContainer>
		</Container>
	);
};
export default MilestoneFormat;
