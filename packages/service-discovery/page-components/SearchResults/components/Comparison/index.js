import { Button } from '@cogoport/components';
import React from 'react';

import ComparisonTable from './ComparisonTable';
import styles from './styles.module.css';

function Comparison({ setScreen = () => {}, rateCardsForComparison = () => {} }) {
	console.log('rateCardsForComparison', rateCardsForComparison);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.line_div}>
					View Comparison
				</div>
				<div className={styles.button_wrapper}>
					<Button
						onClick={() => {
							setScreen('listRateCard');
						}}
						size="md"
						themeType="tertiary"
						className={styles.button}
						style={{
							paddingLeft    : 16,
							paddingRight   : 16,
							paddingTop     : 20,
							paddingBottom  : 20,
							textDecoration : 'underline',
						}}
					>
						Go Back
					</Button>

					<Button
						onClick={() => {

						}}
						size="md"
						themeType="secondary"
						className={styles.button}
						style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 20, paddingBottom: 20 }}
					>
						Share
					</Button>
					<Button
						onClick={() => {
						// setScreen('comparison');
						}}
						size="md"
						themeType="accent"
						className={styles.button}
						style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 20, paddingBottom: 20 }}
					>
						Create Quotation
					</Button>
				</div>
			</div>
			<ComparisonTable rateCardsForComparison={rateCardsForComparison} />
		</>
	);
}

export default Comparison;
