import React, { useState } from 'react';
import { Button, Popover } from '@cogoport/front/components';
import { Text } from '@cogo/commons/components';
import { Container, FlexCol } from './styles';

const ExchangeDetails = ({
	children = null,
	availableCurrencyConversions = {},
	invoiceCurrency = '',
}) => {
	const [show, setShow] = useState(false);

	const currencyConversions = Object.keys(availableCurrencyConversions || {});

	const renderBody = () => (
		<FlexCol>
			{currencyConversions?.map((key) => (
				<Text size={12} color="#666" as="span" bold key={key}>
					{`${key}`} 1 ={' '}
					{`${Number(availableCurrencyConversions[key])?.toFixed(2)}`}{' '}
					{`${invoiceCurrency}`}
				</Text>
			))}
		</FlexCol>
	);

	return (
		<Container>
			{currencyConversions?.length > 1 ? (
				<Popover
					theme="light"
					show={show}
					placement="bottom"
					interactive
					onOuterClick={() => setShow(false)}
					trigger="mouseenter"
					content={renderBody()}
				>
					<Button>{children}</Button>
				</Popover>
			) : null}
		</Container>
	);
};

export default ExchangeDetails;
