import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';
import React from 'react';

import useGetGraph from '../../../../../hooks/useGetGraph';
import ResponsiveChart from '../CardComponent/ResponsiveChart';

import GetData from './GetData';
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

	const revenueDetails = data?.SALES_INVOICE?.filter((element) => (element.invoiceType === 'REVENUE'));

	const formatData = (revenueDetails || [])?.map((item) => (
		{
			date: format(
				item?.duration,
				GLOBAL_CONSTANTS.formats?.date?.['dd MMM'],
				{},
				false,
			),
			Amount : item?.amount,
			Count  : item?.count,
			year   : format(
				item?.duration,
				GLOBAL_CONSTANTS.formats?.date?.yyyy,
				{},
				false,
			),
		}));

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
			) : (
				<GetData
					SALES_INVOICE={SALES_INVOICE}
					filters={filters}
					entityCode={entityCode}
				/>
			)}
		</div>
	);
}

export default SalesComponent;
