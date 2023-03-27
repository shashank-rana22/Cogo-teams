import { Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { format } from '@cogoport/utils';
import React from 'react';

import useGetGraph from '../../../../../hooks/useGetGraph';

import ResponsiveChart from './ResponsiveChart';
import BarData from './ResponsiveChart/data';
import styles from './styles.module.css';

function CardComponent({ subActiveTab, dailyStatsData, toggleData, loading, filters, filterValue }) {
	const { data, loading:loadingData } = useGetGraph({ filters, filterValue, subActiveTab });
	const getData = () => {
		if (loading) {
			return (
				<div className={styles.place}>
					<Placeholder height="80px" width="250px" margin="0px 16px 0px 0px" />
					<Placeholder height="80px" width="250px" margin="0px 16px 0px 0px" />
					<Placeholder height="80px" width="250px" margin="0px 16px 0px 0px" />
					<Placeholder height="80px" width="250px" margin="0px 16px 0px 0px" />
				</div>
			);
		}
		if (dailyStatsData) {
			return (dailyStatsData[subActiveTab] || [{}]).map((item) => {
				const { count, amount, duration, dashboardCurrency } = item || {};
				return (
					<div className={styles.item}>
						<div className={styles.sub_flex}>
							<div className={styles.label_flex}>
								<div className={styles.label}>
									{getFormattedPrice(
										amount,
										dashboardCurrency,
										{
											notation              : 'compact',
											compactDisplay        : 'short',
											maximumFractionDigits : 2,
											style                 : 'decimal',
										},
									) || 0}
								</div>
								<div className={styles.count}>
									(
									{count || 0}
									)
								</div>
							</div>
							<div className={styles.value}>
								{format(duration, 'dd MMM YYYY', {}, false) || '-'}
							</div>
						</div>

					</div>
				);
			});
		}
		return [];
	};

	return (
		<div className={styles.flex}>
			{toggleData ? (
				<div className={styles.chart}>
					<ResponsiveChart data={BarData(subActiveTab, data)} loadingData={loadingData} />
				</div>
			) : getData()}

		</div>
	);
}
export default CardComponent;
