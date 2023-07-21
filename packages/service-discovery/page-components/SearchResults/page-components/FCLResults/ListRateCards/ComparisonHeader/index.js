import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ComparisonHeader({ rateCardsForComparison = [], setScreen = () => {} }) {
	const NumberOfOptionSelected = rateCardsForComparison.length;
	const tradersLine = rateCardsForComparison.map((item) => (item.shipping_line.short_name));

	return (
		<div className={styles.container}>
			<div className={styles.line_div}>
				{NumberOfOptionSelected}
				{' '}
				Options Selected

				<div className={styles.traders_line}>
					{tradersLine.map((item) => (
						<span key={item} className={styles.pills}>
							{item}
						</span>
					))}
				</div>
			</div>
			<div className={styles.button_wrapper}>
				<Button
					onClick={() => {

					}}
					size="md"
					themeType="secondary"
					className={styles.button}
					style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 20, paddingBottom: 20 }}
				>
					Share Quotation
				</Button>
				<Button
					onClick={() => {
						setScreen('comparison');
					}}
					size="md"
					themeType="accent"
					className={styles.button}
					style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 20, paddingBottom: 20 }}
				>
					View Comparison
				</Button>
			</div>

		</div>
	);
}

export default ComparisonHeader;
