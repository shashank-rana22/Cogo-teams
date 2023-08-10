import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const FOR_MORE_THAN_ONE_CURRENCY = 1;
const DECIMAL_UPTO_SECOND_PLACE = 2;

function ExchangeDetails({
	children = null,
	availableCurrencyConversions = {},
	invoiceCurrency = '',
}) {
	const [show, setShow] = useState(false);

	const currencyConversions = Object.keys(availableCurrencyConversions || {});

	const renderBody = () => (
		<div className={styles.flex_col}>
			{currencyConversions?.map((key) => (
				<div className={styles.text} key={key}>
					{`${key} 1 = ${Number(availableCurrencyConversions[key])?.toFixed(DECIMAL_UPTO_SECOND_PLACE)} 
					${invoiceCurrency}`}
				</div>
			))}
		</div>
	);

	return (
		<div>
			{currencyConversions?.length > FOR_MORE_THAN_ONE_CURRENCY ? (
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
		</div>
	);
}

export default ExchangeDetails;
