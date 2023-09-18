import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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
	const { t = () => {} } = useTranslation(['settlement']);
	const { currency = '', ledCurrency = '' } = selectedData?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { jvListRefetch = () => {} } = useGetJVList({ filters, t });
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
					{t('settlement:balance_text')}
				</div>
				<div className={styles.verticalRule} />
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} ${t('settlement:loading_text')}` : getFormatAmount(
							(data && outstandingAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>{t('settlement:outstanding_text')}</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} ${t('settlement:loading_text')}` : getFormatAmount(
							(data && openInvoiceAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>{t('settlement:open_invoice_amount_text')}</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} ${t('settlement:loading_text')}` : getFormatAmount(
							(data && onAccountAmount) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>{t('settlement:on_account_balance_text')}</div>
				</div>
				<div className={styles.diffbalances}>
					<div className={styles.amount}>
						{loading ? `${ledgerCurrency || 'INR'} ${t('settlement:loading_text')}` : getFormatAmount(
							(matchBal) || INITIAL_BAL,
							ledgerCurrency,
						)}
					</div>
					<div>{t('settlement:matching_balance_text')}</div>
				</div>
				<div className={styles.match_button}>
					<Button
						size="md"
						themeType="primary"
						disabled={isEmpty(selectedData)}
						loading={loading || dataLoading}
						onClick={() => { setMatchModalShow(true); jvListRefetch(); getExchangeRate(); }}
					>
						{t('settlement:match_text')}
					</Button>
				</div>
			</div>
		</div>
	);
}
export default Amount;
