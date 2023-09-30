import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, format } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const FIRST_ARRAY_SIZE = 3;
const SECOND_ARRAY_SIZE = 4;
const DEFAULT_AMOUNT = 0;

function GetData({ SALES_INVOICE = [],	filters = {},	entityCode = 0 }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const DURATION_LAST_INDEX = 3;

	const INVOICE_ARRAY = [];
	const CREDIT_NOTE_ARRAY = [];
	const REVENUE_ARRAY = [];

	const OPTIONS = {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	};

	const customAmount = ({ amount, currency }) => formatAmount({ amount, currency, options: OPTIONS });

	SALES_INVOICE.forEach((element) => {
		if (element.invoiceType === 'INVOICE') {
			INVOICE_ARRAY.push(element);
		} else if (element.invoiceType === 'CREDIT_NOTE') {
			CREDIT_NOTE_ARRAY.push(element);
		} else if (element.invoiceType === 'REVENUE') {
			REVENUE_ARRAY.push(element);
		}
	});

	const DURATIONS = [];
	INVOICE_ARRAY.forEach((item) => (
		DURATIONS.push(item.duration)
	));
	DURATIONS.sort();

	const getDataFromDuration = (type, date) => type.filter((item) => item?.duration === date);

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const yearFormat = () => {
		if (!isEmpty(filters.year) && !isEmpty(filters.month)) {
			return GLOBAL_CONSTANTS.formats?.date?.['MMM yyyy'];
		}
		if (!isEmpty(filters.year)) {
			return GLOBAL_CONSTANTS.formats?.date?.yyyy;
		}
		if (!isEmpty(filters.month)) {
			return GLOBAL_CONSTANTS.formats?.date?.MMM;
		}
		return GLOBAL_CONSTANTS.formats?.date?.['dd MMM yyyy'];
	};

	return (
		<div className={styles.container}>

			<table className={styles.table_style}>
				<tr>
					<td>{' '}</td>

					{[...Array(FIRST_ARRAY_SIZE).keys()].map((val) => (
						<td className={styles.styled_date} key={val}>
							{
                                format(DURATIONS[val], yearFormat(), {}, false)
                            }
						</td>
					))}

					<td className={styles.styled_date_last}>
						{
                            format(DURATIONS[DURATION_LAST_INDEX], yearFormat(), {}, false)
                        }
					</td>
				</tr>
				<tr className={styles.credit_note}>
					<td>
						<div className={styles.text_margin}>
							{t('sales')}
						</div>
						<div className={styles.credit_note_text}>
							<span className={styles.text_margin}>{t('credit_notes')}</span>
							(-)
						</div>
					</td>

					{[...Array(SECOND_ARRAY_SIZE).keys()].map((val) => (

						<td key={val}>
							<div className={styles.styled_credit}>
								{customAmount({
									amount: getDataFromDuration(INVOICE_ARRAY, DURATIONS[val])
										?.[GLOBAL_CONSTANTS.zeroth_index]?.amount || DEFAULT_AMOUNT,
									currency: getDataFromDuration(
										INVOICE_ARRAY,
										DURATIONS[val],
									)?.[GLOBAL_CONSTANTS.zeroth_index]?.dashboardCurrency || currency,
								})}
							</div>
							<div className={cl`${styles.styled_credit} ${styles.negative_credit}`}>
								{customAmount({
									amount:	getDataFromDuration(CREDIT_NOTE_ARRAY, DURATIONS[val])
										?.[GLOBAL_CONSTANTS.zeroth_index]?.amount || DEFAULT_AMOUNT,
									currency: getDataFromDuration(
										CREDIT_NOTE_ARRAY,
										DURATIONS[val],
									)?.[GLOBAL_CONSTANTS.zeroth_index]?.dashboardCurrency || currency,
								})}

								<span className={styles.credit_note_text}>(-)</span>
							</div>

						</td>

					))}
				</tr>
				<tr>
					<td>
						{t('revenue')}
					</td>

					{[...Array(SECOND_ARRAY_SIZE).keys()].map((val) => (

						<td key={val}>

							<span className={styles.styled_amount}>

								{customAmount({
									amount: getDataFromDuration(REVENUE_ARRAY, DURATIONS[val])
										?.[GLOBAL_CONSTANTS.zeroth_index]?.amount || DEFAULT_AMOUNT,
									currency: getDataFromDuration(
										REVENUE_ARRAY,
										DURATIONS[val],
									)?.[GLOBAL_CONSTANTS.zeroth_index]?.dashboardCurrency || currency,
								})}
							</span>

						</td>
					))}

				</tr>
			</table>
		</div>
	);
}

export default GetData;
