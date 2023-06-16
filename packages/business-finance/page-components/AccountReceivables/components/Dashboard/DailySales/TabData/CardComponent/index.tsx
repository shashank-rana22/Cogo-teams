import { Tooltip, Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format } from '@cogoport/utils';
import React from 'react';

import useGetGraph from '../../../../../hooks/useGetGraph';

import ResponsiveChart from './ResponsiveChart';
import BarData from './ResponsiveChart/data';
import styles from './styles.module.css';

interface SubFilterInterface {
	month?: string,
	year?: string,
	date?: Date
}
interface CardComponentProps {
	subActiveTab?: string,
	dailyStatsData?: object,
	toggleData?: boolean,
	loading?: boolean,
	filters?: SubFilterInterface,
	filterValue?: object
	entityCode?: string
}

function CardComponent({
	subActiveTab, dailyStatsData, toggleData, loading,
	filters, filterValue, entityCode,
}: CardComponentProps) {
	const { data, loading: loadingData } = useGetGraph({ filters, filterValue, subActiveTab, entityCode, toggleData });
	const getData = () => {
		const getFormat = (duration) => {
			if (filters.month) 			{
				return format(duration, 'MMM', {}, false) || '-';
			}
			if (filters.year) {
				return format(duration, 'YYYY', {}, false) || '-';
			}
			if (filters.date) {
				return 	format(duration, 'dd MMM YYYY', {}, false) || '-';
			}
			return format(duration, 'dd MMM YYYY', {}, false) || '-';
		};
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

		if (dailyStatsData) {
			return (dailyStatsData[subActiveTab] || [{}]).map((item) => {
				const { count, amount, duration, dashboardCurrency } = item || {};
				return (
					<div className={styles.item} key={item}>
						<div className={styles.sub_flex}>
							<div className={styles.label_flex}>
								<div className={styles.styled_text} />
								<div className={styles.label}>
									<Tooltip content={(
										<div>
											{formatAmount({
												amount,
												currency : dashboardCurrency,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',

												},
											})}
										</div>
									)}
									>
										<div className={styles.wrapper}>
											{formatAmount({
												amount   : amount || 0,
												currency : dashboardCurrency,
												options  : {
													notation              : 'compact',
													compactDisplay        : 'short',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
													style                 : 'currency',

												},
											})}
										</div>

									</Tooltip>
								</div>
								<div className={styles.count}>
									(
									{count || 0}
									)
								</div>
							</div>
							<div className={styles.value}>
								{getFormat(duration)}
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
export default CardComponent;
