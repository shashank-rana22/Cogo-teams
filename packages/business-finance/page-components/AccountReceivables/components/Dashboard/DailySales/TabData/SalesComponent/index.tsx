import { Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { isEmpty, format } from '@cogoport/utils';
import React from 'react';

import useGetGraph from '../../../../../hooks/useGetGraph';
import ResponsiveChart from '../CardComponent/ResponsiveChart';

import styles from './styles.module.css';

function SalesComponent({
	subActiveTab,
	dailyStatsData,
	toggleData,
	loading,
	filters,
	filterValue,
	entityCode,
}) {
	const { data, loading: loadingData } = useGetGraph({ filters, filterValue, subActiveTab, entityCode, toggleData });

	const { SALES_INVOICE = [] } = dailyStatsData || {};

	const invoiceArray = [];
	const creditNoteArray = [];
	const revenueArray = [];

	SALES_INVOICE.forEach((element) => {
		if (element.invoiceType === 'INVOICE') {
			invoiceArray.push(element);
		} else if (element.invoiceType === 'CREDIT_NOTE') {
			creditNoteArray.push(element);
		} else if (element.invoiceType === 'REVENUE') {
			revenueArray.push(element);
		}
	});

	const durations = [];
	invoiceArray.forEach((item) => (
		durations.push(item.duration)
	));
	durations.sort();

	const getDataFromDuration = (type, date) => type.filter((item) => item?.duration === date);

	const revenueDetails = data?.SALES_INVOICE?.filter((element) => (element.invoiceType === 'REVENUE'));

	const formatData = (revenueDetails)?.map((item) => (
		{
			date: format(
				item?.duration,
				'dd MMM ',
				{},
				false,
			),
			Amount : item?.amount,
			Count  : item?.count,
			year   : format(
				item?.duration,
				'YYYY',
				{},
				false,
			),
		}));

	const yearFormat = () => {
		if (!isEmpty(filters.year) && !isEmpty(filters.month)) {
			return 'MMM YYYY';
		}
		if (!isEmpty(filters.year)) {
			return 'YYYY';
		}
		if (!isEmpty(filters.month)) {
			return 'MMM';
		}
		return 'dd MMM YYYY';
	};

	const getData = () => (
		<div className={styles.container}>

			<table style={{ width: '1200px', height: '200px', marginTop: '20px' }}>
				<tr>
					<td>{' '}</td>
					<td className={styles.styled_date}>
						{
										format(
											durations[0],
											yearFormat(),
											{},
											false,
										)
                    }
					</td>
					<td className={styles.styled_date}>
						{format(
							durations[1],
							yearFormat(),
							{},
							false,
						)}

					</td>
					<td className={styles.styled_date}>
						{	format(
							durations[2],
							yearFormat(),
							{},
							false,
						)}

					</td>
					<td className={styles.styled_date_last}>
						{	format(
							durations[3],
							yearFormat(),
							{},
							false,
						)}

					</td>
				</tr>
				<tr className={styles.credit_note}>
					<td>

						<div>
							Sales
						</div>
						<div className={styles.credit_note_text}>
							Credit Notes (-)
						</div>
					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								getDataFromDuration(invoiceArray, durations[0])?.[0]?.amount,
								getDataFromDuration(invoiceArray, durations[0])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}

							{getFormattedPrice(
								getDataFromDuration(creditNoteArray, durations[0])?.[0]?.amount,
								getDataFromDuration(creditNoteArray, durations[0])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							{' '}
							<span className={styles.credit_note_text}>(-)</span>
						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>

							{getFormattedPrice(
								getDataFromDuration(invoiceArray, durations[1])?.[0]?.amount,
								getDataFromDuration(invoiceArray, durations[1])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							{getFormattedPrice(
								getDataFromDuration(creditNoteArray, durations[1])?.[0]?.amount,
								getDataFromDuration(creditNoteArray, durations[1])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							{' '}
							<span className={styles.credit_note_text}>(-)</span>
						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								getDataFromDuration(invoiceArray, durations[2])?.[0]?.amount,
								getDataFromDuration(invoiceArray, durations[2])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							{getFormattedPrice(
								getDataFromDuration(creditNoteArray, durations[2])?.[0]?.amount,
								getDataFromDuration(creditNoteArray, durations[2])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							{' '}
							<span className={styles.credit_note_text}>(-)</span>
						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								getDataFromDuration(invoiceArray, durations[3])?.[0]?.amount,
								getDataFromDuration(invoiceArray, durations[3])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							{getFormattedPrice(
								getDataFromDuration(creditNoteArray, durations[3])?.[0]?.amount,
								getDataFromDuration(creditNoteArray, durations[3])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							{' '}
							<span className={styles.credit_note_text}>(-)</span>
						</div>

					</td>
				</tr>
				<tr>
					<td>
						Revenue
					</td>
					<td>

						<span className={styles.styled_amount}>

							{getFormattedPrice(
								getDataFromDuration(revenueArray, durations[0])?.[0]?.amount,
								getDataFromDuration(revenueArray, durations[0])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</span>

					</td>
					<td>

						<span className={styles.styled_amount}>
							{getFormattedPrice(
								getDataFromDuration(revenueArray, durations[1])?.[0]?.amount,
								getDataFromDuration(revenueArray, durations[1])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</span>

					</td>
					<td>

						<span className={styles.styled_amount}>
							{getFormattedPrice(
								getDataFromDuration(revenueArray, durations[2])?.[0]?.amount,
								getDataFromDuration(revenueArray, durations[2])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}

						</span>

					</td>
					<td>

						<span className={styles.styled_amount}>
							{getFormattedPrice(
								getDataFromDuration(revenueArray, durations[3])?.[0]?.amount,
								getDataFromDuration(revenueArray, durations[3])?.[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</span>

					</td>

				</tr>
			</table>
		</div>
	);
	if (loading || loadingData) {
		return (
			<div className={styles.place}>
				{
					[1, 2, 3, 4].map(() => (
						<Placeholder className={styles.placeholder_container} />
					))
				}
			</div>
		);
	}

	return (
		<div className={styles.flex}>
			{toggleData ? (
				<div className={styles.chart}>
					<ResponsiveChart
						data={formatData}
						loadingData={loadingData}
						entityCode={entityCode}
						showCount={false}
					/>
				</div>
			) : getData()}
		</div>
	);
}

export default SalesComponent;
