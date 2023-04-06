import { getFormattedPrice } from '@cogoport/forms';
import { format } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useGetGraph from '../../../../../hooks/useGetGraph';
import ResponsiveChart from '../CardComponent/ResponsiveChart';
import BarData from '../CardComponent/ResponsiveChart/data';

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
	const { data, loading:loadingData } = useGetGraph({ filters, filterValue, subActiveTab, entityCode });

	const { SALES_INVOICE = [] } = dailyStatsData || {};
	console.log('dailyStatsData', dailyStatsData);

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

	const getData = () => (
		<div className={styles.container}>

			<table style={{ width: '1200px', height: '200px', marginTop: '20px' }}>
				<tr>
					<td>{' '}</td>
					<td className={styles.styled_date}>
						{
										format(
											invoiceArray[0]?.duration,
											'dd MMM YYYY',
											{},
											false,
										)
                    }
					</td>
					<td className={styles.styled_date}>
						{format(
							invoiceArray[1]?.duration,
							'dd MMM YYYY',
							{},
							false,
						)}

					</td>
					<td className={styles.styled_date}>
						{	format(
							invoiceArray[2]?.duration,
							'dd MMM YYYY',
							{},
							false,
						)}

					</td>
					<td className={styles.styled_date_last}>
						{	format(
							invoiceArray[3]?.duration,
							'dd MMM YYYY',
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
							(Credit Notes)
						</div>
					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								invoiceArray[0]?.amount,
								invoiceArray[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}

							(
							{getFormattedPrice(
								creditNoteArray[0]?.amount,
								creditNoteArray[0]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							)
						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>

							{getFormattedPrice(
								invoiceArray[1]?.amount,
								invoiceArray[1]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							(
							{getFormattedPrice(
								creditNoteArray[1]?.amount,
								creditNoteArray[1]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							)
						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								invoiceArray[2]?.amount,
								invoiceArray[2]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							(
							{getFormattedPrice(
								creditNoteArray[2]?.amount,
								creditNoteArray[2]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							)

						</div>

					</td>
					<td>
						{' '}
						<div className={styles.styled_credit}>
							{getFormattedPrice(
								invoiceArray[3]?.amount,
								invoiceArray[3]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
						</div>
						<div className={styles.styled_credit}>

							{' '}
							(
							{getFormattedPrice(
								creditNoteArray[3]?.amount,
								creditNoteArray[3]?.dashboardCurrency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							)
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
								revenueArray[0]?.amount,
								revenueArray[0]?.dashboardCurrency,
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
								revenueArray[1]?.amount,
								revenueArray[1]?.dashboardCurrency,
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
								revenueArray[2]?.amount,
								revenueArray[2]?.dashboardCurrency,
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
								revenueArray[3]?.amount,
								revenueArray[3]?.dashboardCurrency,
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

	console.log('subActiveTab', subActiveTab);

	return (
		<div className={styles.flex}>
			{toggleData ? (
				<div className={styles.chart}>
					<ResponsiveChart
						data={BarData(subActiveTab, data)}
						loadingData={loadingData}
						entityCode={entityCode}
					/>
				</div>
			) : getData()}
		</div>
	);
}

export default SalesComponent;
