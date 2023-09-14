import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetExcRate from '../../../hooks/useGetExcRate';
import useGetJVList from '../../../hooks/useGetJvsList';
import { getFormatAmount } from '../../../utils/getFormatAmount';

import styles from './styles.module.css';

const INITIAL_BAL = 0;
function Amount({
	data = {},
	loading = false,
	selectedData = [],
	filters = {},
	setMatchModalShow = () => {},
	matchBal = 0,
	dataLoading = false,
}) {
	const { currency = '', ledCurrency = '' } = selectedData?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { jvListRefetch = () => {} } = useGetJVList({ filters });
	const { getExchangeRate = () => {} } = useGetExcRate({ from_cur: currency, to_cur: ledCurrency });
	const {
		ledgerCurrency = '',
		outstandingAmount = 0,
		openInvoiceAmount = 0,
		onAccountAmount = 0,
	} = data || {};
	return (
		<div className={styles.Container}>
			<div className={styles.balanceCard}>
				<div className={styles.balance}>
					Balance
				</div>
				<div className={styles.verticalRule} />
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && outstandingAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>Outstanding</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && openInvoiceAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>Open Invoice Amount</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(data && onAccountAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>On Account Balance</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} Loading...` : getFormatAmount(
							(matchBal) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>Matching Balance</div>
				</div>
				<div className={styles.match_button}>
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
