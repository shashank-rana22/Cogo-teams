import React from 'react';
import {
	Label,
	ModeWrapper,
	Value,
	ButtonWrap,
	CustomButton,
} from './styles.js';

const SelectNormal = ({
	setStep,
	airFreightNormalBookingCondition = false,
}) => {
	return (
		<ModeWrapper>
			<Label>Mode of booking</Label>
			<Value>Normal Booking</Value>
			<ButtonWrap>
				<CustomButton
					onClick={() => {
						setStep(2);
					}}
					disabled={airFreightNormalBookingCondition}
				>
					{airFreightNormalBookingCondition
						? 'Please revert rate first'
						: 'Proceed With Normal Booking'}
				</CustomButton>
			</ButtonWrap>
		</ModeWrapper>
	);
};

export default SelectNormal;
