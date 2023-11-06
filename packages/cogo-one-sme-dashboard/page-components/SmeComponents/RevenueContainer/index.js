import { Placeholder, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDollar, IcMInfo } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import { PercentageChange } from '../../../common/Elements';
import calcChange from '../../../helpers/calcChange';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import DataView from './DataView';
import styles from './styles.module.css';

const DEFAULT_ITEMS = {
	currency        : 'USD',
	fallback_amount : 0,
};

function RevenueContainer({
	widgetBlocks = null,
	filterParams = {},
}) {
	const geo = getGeoConstants();

	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { total_revenue_data = {} } = dashboardData || {};

	const {
		current_data = {},
		previous_data = {},
	} = total_revenue_data || {};

	const totalRevPercentageChange = calcChange({
		currVal : current_data?.total_revenue,
		prevVal : previous_data?.total_revenue,
	});

	const totalCouPercentageChange = calcChange({
		currVal : current_data?.total_revenue,
		prevVal : previous_data?.total_revenue,
	});

	return (
		<div className={styles.container}>
			<div className={styles.container_left_body}>
				<div className={styles.title}>
					Total Revenue
				</div>

				<div className={styles.data_container_left}>
					<div className={styles.icon_container}>
						<IcMDollar className={styles.dollar_icon} />
					</div>

					<div className={styles.transaction_container}>
						<div className={styles.total_gain}>
							{dashboardLoading
								? <Placeholder height={45} width={120} />
								: (
									<>
										{formatAmount({
											amount   : Number(current_data?.total_revenue || 0),
											currency : DEFAULT_ITEMS?.currency || geo.country.currency.code,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'symbol',
												notation              : 'compact',
												maximumFractionDigits : 2,
											},
										})}

										<PercentageChange percentageChanged={totalRevPercentageChange} />
									</>
								)}
						</div>

						<div className={styles.label_transaction}>
							Transaction
							{dashboardLoading
								? <IcMInfo />
								: (
									<Tooltip
										placement="bottom"
										content="Total Revenue attained"
									>
										<IcMInfo />
									</Tooltip>
								)}
						</div>

						<div className={styles.total_transactions}>
							{dashboardLoading
								? <Placeholder height={33} width={120} />
								: (
									<>
										{current_data?.total_count || 0}
										<PercentageChange percentageChanged={totalCouPercentageChange} />
									</>
								)}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.data_container}>
				<div className={styles.organic_container}>
					<DataView
						amount={current_data?.organic_revenue || 0}
						currency={current_data?.organic_currency || DEFAULT_ITEMS?.currency}
						transactions={current_data?.organic_count || 0}
						geo={geo}
						title="Organic"
						dashboardLoading={dashboardLoading}
					/>

					<Image
						height={36}
						width={110}
						src={GLOBAL_CONSTANTS.image_url.graph_representation}
						alt="graph"
					/>
				</div>

				<div className={styles.inorganic_container}>
					<div className={styles.inorganic_label}>
						In-organic
					</div>

					<div className={styles.inorganic_body}>
						<div className={styles.allocated_body}>
							<DataView
								amount={current_data?.inorganic_allocated_revenue}
								currency={current_data?.inorganic_currency || DEFAULT_ITEMS?.currency}
								transactions={current_data?.inorganic_allocated_count}
								geo={geo}
								title="Allocated"
								dashboardLoading={dashboardLoading}
								showGrowth={calcChange({
									currVal : current_data?.inorganic_allocated_revenue,
									prevVal : previous_data?.inorganic_allocated_revenue,
								}) > 0 ? 'positive' : 'negative'}
							/>
						</div>

						<div className={styles.allocated_body}>
							<DataView
								amount={current_data?.inorganic_unallocated_revenue}
								currency={current_data?.inorganic_currency || DEFAULT_ITEMS?.currency}
								transactions={current_data?.inorganic_unallocated_count}
								geo={geo}
								title="Non - Allocated"
								dashboardLoading={dashboardLoading}
								showGrowth={calcChange({
									currVal : current_data?.inorganic_unallocated_revenue,
									prevVal : previous_data?.inorganic_unallocated_revenue,
								}) > 0 ? 'positive' : 'negative'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RevenueContainer;
