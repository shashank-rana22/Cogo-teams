import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_ARRAY_LENGTH = 10;

function FixedCard({
	earningPayroll = false, handleSubmit = () => {},
	selectedItems = {},
}) {
	return (
		<div className={styles.container}>
			<Button
				size="md"
				onClick={() => { handleSubmit(); }}
			>
				Proceed With Payroll
			</Button>

			<div className={!earningPayroll ? styles.text : styles.hide}>

				<span className={styles.span_text}>

					{Object.keys(selectedItems).length > DEFAULT_ARRAY_LENGTH
						? Object.keys(selectedItems).length
						: `0${Object.keys(selectedItems).length}`}
					{' '}
					employees are selected on this page

				</span>
			</div>
		</div>
	);
}

export default FixedCard;
