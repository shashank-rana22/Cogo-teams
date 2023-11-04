import { Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDollar, IcMInfo } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import { PercentageChange } from '../../../common/Elements';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import DataView from './DataView';
import styles from './styles.module.css';

const FALLBACK_AMOUNT = 0;

const ITEM = {
	total_amount                   : 70000,
	currency                       : 'USD',
	percentage_gain                : 3,
	total_transactions             : 40,
	percentage_change_transactions : -1.7,
	organic_amount                 : 34509,
	organic_currency               : 'USD',
	organic_transactions           : 23,
	allocated_amount               : 19701,
	allocated_currency             : 'USD',
	allocated_transactions         : 9,
	non_allocated_amount           : 17308,
	non_allocated_currency         : 'USD',
	non_allocated_transactions     : 8,
};

function RevenueContainer({ widgetBlocks = null }) {
	const geo = getGeoConstants();

	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks });

	console.log('dashboardLoading:', dashboardLoading, dashboardData);

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
							{formatAmount({
								amount   : Number(ITEM?.total_amount) || FALLBACK_AMOUNT,
								currency : ITEM?.currency || geo.country.currency.code,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 0,
								},
							})}

							<PercentageChange percentageChanged={ITEM?.percentage_gain} />
						</div>

						<div className={styles.label_transaction}>
							Transaction
							<Tooltip
								placement="bottom"
								content="Total Revenue attained"
							>
								<IcMInfo />
							</Tooltip>
						</div>

						<div className={styles.total_transactions}>
							{ITEM?.total_transactions || 0}
							<PercentageChange percentageChanged={ITEM?.percentage_change_transactions} />
						</div>
					</div>
				</div>
			</div>

			<div className={styles.data_container}>
				<div className={styles.organic_container}>
					<DataView
						amount={ITEM?.organic_amount}
						currency={ITEM?.organic_currency}
						transactions={ITEM?.organic_transactions}
						geo={geo}
						title="Organic"
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
								amount={ITEM?.allocated_amount}
								currency={ITEM?.allocated_currency}
								transactions={ITEM?.allocated_transactions}
								geo={geo}
								title="Allocated"
								showGrowth="positive"
							/>
						</div>

						<div className={styles.allocated_body}>
							<DataView
								amount={ITEM?.non_allocated_amount}
								currency={ITEM?.non_allocated_currency}
								transactions={ITEM?.non_allocated_transactions}
								geo={geo}
								title="Not - Allocated"
								showGrowth="negative"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RevenueContainer;
