import { startCase } from '@cogoport/utils';
import React from 'react';

import {
	Container,
	Pill,
	Text,
	PaymentText,
	PillMain,
	PaymentStatus,
	Collect,
} from './styles';

function Status({ state, payment_term }) {
	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	return (
		<Container>
			<PillMain>
				<Pill className={state}>
					<Text className={state}>{statusText}</Text>
				</Pill>
			</PillMain>

			{payment_term ? (
				<PaymentStatus>
					<PaymentText>Payment Term: </PaymentText>

					<Collect className={state}>
						{startCase(payment_term)}
						{' '}
					</Collect>
				</PaymentStatus>
			) : null}
		</Container>
	);
}

export default Status;
