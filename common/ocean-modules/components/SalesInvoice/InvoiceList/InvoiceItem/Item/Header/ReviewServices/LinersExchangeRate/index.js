import React from 'react';
import { Button } from '@cogoport/front/components/admin';
import { IcMError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/front/utils';
import {
	StyledModal,
	Form,
	ConfirmLabel,
	ButtonContainer,
	Heading,
	Flex,
	Title,
	Line,
	Message,
} from './styles';

function LinersExchangeRateConfirm({
	invoice = {},
	setShowExchangeRateConfirmation = () => {},
	setShow = () => {},
	showExchangeRateConfirmation = '',
}) {
	return (
		<StyledModal
			show={showExchangeRateConfirmation}
			closable={false}
			width={800}
		>
			<Heading>MARK AS REVIEWED - WARNING</Heading>
			<Form>
				<Message>
					<IcMError width={30} height={30} fill="#ffe6a7" />
					<ConfirmLabel>
						Liners Exchange Rates are not available yet. Do you want to proceed
						with system exchange rates?
					</ConfirmLabel>
				</Message>

				{!isEmpty(invoice?.exchange_rates) ? (
					<Heading className="sub_heading">Declared Exchange Rates</Heading>
				) : null}

				{Object.keys(invoice?.exchange_rates)?.map((item) => {
					return (
						<Flex className="row">
							<Title className="key">{item?.split('_')?.[0]}</Title>
							<Line />

							<Title className="key">{item?.split('_')?.[1]}</Title>
							<Line className="arrow" />

							<Title className="value">{invoice?.exchange_rates?.[item]}</Title>
						</Flex>
					);
				})}
			</Form>

			<ButtonContainer>
				<Button
					className="secondary md"
					style={{ marginRight: 12 }}
					onClick={() => setShow(false)}
				>
					Close
				</Button>

				<Button
					className="primary md reviewed"
					onClick={() => setShowExchangeRateConfirmation(false)}
				>
					Proceed
				</Button>
			</ButtonContainer>
		</StyledModal>
	);
}

export default LinersExchangeRateConfirm;
