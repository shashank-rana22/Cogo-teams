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
	index: indexnumber,
	buttonText,
}) => {
	const fname = `${name}.${indexnumber}`;
	const { fields, append, remove } = useFieldArray({
		control,
		name: fname,
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
						<Title>{`Milestone ${index + 1}`}</Title>
						<Milestone
							watch={watch}
							key={field.id}
							field={field}
							index={index}
							indexnumber={indexnumber}
							control={control}
							controls={controls}
							name={name}
							remove={remove}
							error={error?.[indexnumber]?.[index]}
							buttonText={buttonText}
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
