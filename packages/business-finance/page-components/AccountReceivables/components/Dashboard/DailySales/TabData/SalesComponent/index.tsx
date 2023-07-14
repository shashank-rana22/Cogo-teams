import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
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

	const INVOICE_ARRAY = [];
	const CREDIT_NOTE_ARRAY = [];
	const REVENUE_ARRAY = [];

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

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

	const revenueDetails = data?.SALES_INVOICE?.filter((element) => (element.invoiceType === 'REVENUE'));

	const formatData = (revenueDetails || [])?.map((item) => (
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

			<table className={styles.table_style}>
				<tr>
					<td>{' '}</td>
					{[1, 2, 3].map((val) => (
						<td className={styles.styled_date} key={val}>
							{
										format(
											DURATIONS[val - 1],
											yearFormat(),
											{},
											false,
										)
                    }
						</td>
					))}

					<td className={styles.styled_date_last}>
						{	format(
							DURATIONS[3],
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
					{[1, 2, 3, 4].map((val) => (

						<td key={val}>
							{' '}
							<div className={styles.styled_credit}>
								{
								formatAmount({
									amount   : getDataFromDuration(INVOICE_ARRAY, DURATIONS[val - 1])?.[0]?.amount || 0,
									currency : getDataFromDuration(
										INVOICE_ARRAY,
										DURATIONS[val - 1],
									)?.[0]?.dashboardCurrency || currency,
									options: {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})
}
							</div>
							<div className={styles.styled_credit}>

								{' '}

								{formatAmount({
									amount:
									getDataFromDuration(CREDIT_NOTE_ARRAY, DURATIONS[val - 1])?.[0]?.amount || 0,
									currency: getDataFromDuration(
										CREDIT_NOTE_ARRAY,
										DURATIONS[val - 1],
									)?.[0]?.dashboardCurrency || currency,
									options: {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
								{' '}
								<span className={styles.credit_note_text}>(-)</span>
							</div>

						</td>

					))}
				</tr>
				<tr>
					<td>
						Revenue
					</td>

					{[1, 2, 3, 4].map((val) => (

						<td key={val}>

							<span className={styles.styled_amount}>

								{formatAmount({
									amount   : getDataFromDuration(REVENUE_ARRAY, DURATIONS[val - 1])?.[0]?.amount || 0,
									currency : getDataFromDuration(
										REVENUE_ARRAY,
										DURATIONS[val - 1],
									)?.[0]?.dashboardCurrency || currency,
									options: {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</span>

						</td>
					))}

				</tr>
			</table>
		</div>
	);
	if (loading) {
		return (
			<div className={styles.place}>
				{
					[1, 2, 3, 4].map((val) => (
						<Placeholder key={val} className={styles.placeholder_container} />
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
