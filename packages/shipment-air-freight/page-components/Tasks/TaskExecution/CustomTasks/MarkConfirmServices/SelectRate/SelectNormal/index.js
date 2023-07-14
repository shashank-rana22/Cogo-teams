import { Button } from '@cogoport/components';
import React from 'react';

function SelectNormal({ setStep }) {
	const VALUE_TWO = 2;
	return (
		<div>
			<div style={{
				fontWeight   : '500',
				fontSize     : '14px',
				lineHeight   : '16px',
				color        : '#333333',
				marginBottom : '10px',
				marginLeft   : '5px',
			}}
			>
				Mode of booking

			</div>
			<div style={{
				fontWeight : '400',
				fontSize   : '12px',
				marginLeft : '5px',
			}}
			>
				Normal Booking

			</div>
			<Button
				onClick={() => {
					setStep(VALUE_TWO);
				}}
			>
				Proceed With Normal Booking
			</Button>
		</div>
	);
}

export default SelectNormal;
