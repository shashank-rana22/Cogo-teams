import React from 'react';
import { Button } from '@cogoport/front/components/admin';
import styled from '@cogoport/front/styled';
import { useFieldArray } from '@cogoport/front/hooks';
import startCase from '@cogo/utils/startCase';
import Child from '../../../../../../commons/Layout/ChildFormat/child';

const ChildFormat = ({
	name,
	control,
	register,
	controls,
	error,
	showElements,
	buttonText,
	heading,
	showButtons = true,
	disabled = false,
	customValues = [],
	setShow = () => {},
	setId = () => {},
	disabledButtons = {},
	...rest
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleClick = (id) => {
		setId(id);
		setShow(true);
	};

	return (
		<Container className={`form-fieldArray-${name}`}>
			{fields.map((field, index) => (
				<>
					<Heading>
						{showButtons ? `${startCase(name)} ${index + 1}` : heading}
					</Heading>
					<Child
						{...rest}
						key={field.id}
						field={field}
						index={index}
						register={register}
						control={control}
						controls={controls}
						name={name}
						remove={remove}
						error={error?.[index]}
						showElements={showElements?.[index]}
						customLabels={customValues?.label?.[index]}
						disabled={disabled}
					/>
					<Button
						disabled={
							!!(disabledButtons[index] === undefined || disabledButtons[index])
						}
						onClick={() => handleClick(index)}
					>
						Auto Generate LR
					</Button>
				</>
			))}
			{showButtons && !disabled ? (
				<ButtonWrap className={`form-fieldArray-${name}-add`}>
					<Button onClick={() => append(childEmptyValues)}>
						<AddIcon>+</AddIcon>
						{buttonText || 'ADD'}
					</Button>
				</ButtonWrap>
			) : null}
		</Container>
	);
};

export default ChildFormat;

const Container = styled.div`
	width: 100%;
	padding: 0px 8px;
`;
const Heading = styled.div`
	font-size: 18px;
	font-weight: 600;
	color: #393f70;
	margin-top: 25px;
`;
const ButtonWrap = styled.div`
	display: flex;
	margin-top: 20px;

	.core-ui-button-root {
		display: flex;
		align-items: center;
		background: #ffffff;
		border: 1px solid #393f70;
		color: #393f70;
		border-radius: 4px;
		font-size: 12px;
		padding: 14px 32px 14px 14px;
		height: 32px;
	}
`;

const AddIcon = styled.div`
	width: 30px;
	height: 30px;
	background: #ffffff;
	color: #393f70;
	border-radius: 100%;
	font-size: 28px;
	padding-left: 1px;
	margin-right: 10px;
	font-weight: 300;
`;
