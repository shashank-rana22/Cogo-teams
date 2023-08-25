import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Amount({
	data = [],
	loading = false,
	selectedData = [],
	// setSelectedData,
	setMatchModalShow = false,
	// matchModalShow,
	totalMatchingBalance = 0,
}) {
	// console.log(selectedData);
	const INITIAL_BAL = 0;
	return (
		<div className={styles.Container}>
			<div className={styles.BalanceCard}>
				<div className={styles.Balance}>
					Balance
				</div>
				<div className={styles.VerticalRule} />
				{/* {loading ? (
					<div className={styles.loadingText}>Loading...</div>
				) : (
					<> */}
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{data?.ledgerCurrency}
						{' '}
						{loading ? 'Loading...' : (data && data?.outstandingAmount) || INITIAL_BAL}
					</div>
					<div>Outstanding</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{data?.ledgerCurrency}
						{' '}
						{loading ? 'Loading...' : (data && data?.openInvoiceAmount) || INITIAL_BAL}
					</div>
					<div>Open Invoice Amount</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{data?.ledgerCurrency}
						{' '}
						{loading ? 'Loading...' : (data && data?.onAccountAmount) || INITIAL_BAL}
					</div>
					<div>On Account Balance</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{data?.ledgerCurrency}
						{' '}
						{loading ? 'Loading...' : (totalMatchingBalance) || INITIAL_BAL}
					</div>
					<div>Matching Balance</div>
				</div>
				<div>
					<Button
						size="md"
						themeType="accent"
						disabled={selectedData.length === INITIAL_BAL}
						loading={loading}
						onClick={() => { setMatchModalShow(true); }}
					>
						Match

					</Button>
				</div>
				{/* </>
				)} */}
			</div>
		</div>
	);
}
export default Amount;
