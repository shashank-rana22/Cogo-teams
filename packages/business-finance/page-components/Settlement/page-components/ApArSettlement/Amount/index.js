import { Button } from '@cogoport/components';
import React, { useEffect } from 'react';

// import useExchangeRate from '../../../hooks/useExchangeRate';
import useGetExcRate from '../../../hooks/useGetExcRate';
import useGetJVList from '../../../hooks/useGetJvsList';

import styles from './styles.module.css';

// import useGetJvList from '../../../hooks/useGetJvList';

function Amount({
	// docData = [],
	data = [],
	loading = false,
	selectedData = [],
	filters,
	// setSelectedData,
	matchModalShow,
	setMatchModalShow = false,
	// matchModalShow,
	totalMatchingBalance = 0,
}) {
	// console.log('sele', selectedData);
	const INITIAL_BAL = 0;
	const ZEROTH_INDEX = 0;
	// const { page, pageLimit } = filters || {};
	// console.log('data', data);
	const { currency, ledCurrency } = selectedData?.[ZEROTH_INDEX] || {};
	// console.log('curre', currency);
	const {
		// JvListData,
		// JvListLoading,
		jvListRefetch,
	} = useGetJVList({ filters });
	const from_cur = currency;
	const to_cur = ledCurrency;
	const {
		getExchangeRate,
	} = useGetExcRate({ from_cur, to_cur });
	useEffect(() => {

	}, [matchModalShow]);
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
						onClick={() => { setMatchModalShow(true); jvListRefetch(); getExchangeRate(); }}
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
