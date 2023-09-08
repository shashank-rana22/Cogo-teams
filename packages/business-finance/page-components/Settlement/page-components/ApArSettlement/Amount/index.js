import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import useGetExcRate from '../../../hooks/useGetExcRate';
import useGetJVList from '../../../hooks/useGetJvsList';
import { getFormatAmount } from '../../../utils/getFormatAmount';

import styles from './styles.module.css';

const INITIAL_BAL = 0;
function Amount({
	data = [],
	loading = false,
	selectedData = [],
	filters = {},
	matchModalShow = false,
	setMatchModalShow = () => {},
	matchBal = 0,
	dataLoading = false,
}) {
	const { currency, ledCurrency } = selectedData?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const {
		jvListRefetch,
	} = useGetJVList({ filters });
	const {
		getExchangeRate,
	} = useGetExcRate({ from_cur: currency, to_cur: ledCurrency });
	useEffect(() => {
	}, [matchModalShow]);
	return (
		<div className={styles.Container}>
			<div className={styles.BalanceCard}>
				<div className={styles.Balance}>
					Balance
				</div>
				<div className={styles.VerticalRule} />
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${data?.ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && data?.outstandingAmount) || INITIAL_BAL,
							data?.ledgerCurrency,
						)}
					</div>
					<div>Outstanding</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${data?.ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && data?.openInvoiceAmount) || INITIAL_BAL,
							data?.ledgerCurrency,
						)}
					</div>
					<div>Open Invoice Amount</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${data?.ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && data?.onAccountAmount) || INITIAL_BAL,
							data?.ledgerCurrency,
						)}
					</div>
					<div>On Account Balance</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${data?.ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(matchBal) || INITIAL_BAL,
							data?.ledgerCurrency,
						)}
					</div>
					<div>Matching Balance</div>
				</div>
				<div>
					<Button
						size="md"
						themeType="primary"
						disabled={isEmpty(selectedData)}
						loading={loading || dataLoading}
						onClick={() => { setMatchModalShow(true); jvListRefetch(); getExchangeRate(); }}
					>
						Match

					</Button>
				</div>
			</div>
		</div>
	);
}
export default Amount;
