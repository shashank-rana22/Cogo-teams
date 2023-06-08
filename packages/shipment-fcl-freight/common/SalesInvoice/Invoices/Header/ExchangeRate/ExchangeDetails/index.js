import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const STATE = 2;

function ExchangeDetails({
	children = null,
	AVAILABLE_CURRENCY_CONVERSION = {},
	invoiceCurrency = '',
}) {
	const [show, setShow] = useState(false);

	const currencyConversions = Object.keys(AVAILABLE_CURRENCY_CONVERSION || {});

	const renderBody = () => (
		<div className={styles.flex_col}>
			{currencyConversions?.map((key) => (
				<div className={styles.text} key={key}>
					{`${key}`}
					{' '}
					1 =
					{' '}
					{`${Number(AVAILABLE_CURRENCY_CONVERSION[key])?.toFixed(STATE)}`}
					{' '}
					{`${invoiceCurrency}`}
				</div>
			))}
		</div>
	);

	return (
		<div>
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
		</div>
	);
}

export default ExchangeDetails;
