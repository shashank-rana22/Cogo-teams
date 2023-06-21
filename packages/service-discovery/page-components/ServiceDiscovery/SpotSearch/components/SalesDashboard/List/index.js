/* eslint-disable no-magic-numbers */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';

import useGetSalesDashboardData from '../../../hooks/useGetSalesDashboardData';
import commonFunctions from '../../../utils/common-functions';
import CC from '../../../utils/condition-constants';

import Loading from './loading';
import Stats from './Stats';
import styles from './styles.module.css';
import Table from './Table';

function List({
	importer_exporter_id,
	heading = '',
	fields = [],
	api = '',
	// apiScope = '',
	stats = [],
	placement = 'center',
	setSelectedRow = () => {},
	authkey = '',
	...rest
}) {
	const isRateList = ['missing_rates', 'disliked_rates'].includes(rest?.type);

	const [serviceType, setServiceType] = useState(() => (isRateList ? 'fcl_freight' : null));

	const {
		isConditionMatches,
		statsData,
		listData,
		loading: listLoading,
		filters,
		setFilters,
		bucketParams,
		setBucketParams,
		extraParams,
		setExtraParams,
	} = useGetSalesDashboardData({ serviceType, isRateList, api, stats, importer_exporter_id, ...rest });

	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	const { renderFunctions } = commonFunctions({ setSelectedRow });

	// const keyToSend = globalViewKeys[rest.type];
	// const agentFilter = keyToSend ? { [keyToSend]: selected_agent_id } : {};

	// const timeKeysToSend = globalTimeKeys[rest.type];

	// const dateFilters = {};
	// if (timeKeysToSend) {
	// 	const initialDateFilters = {
	// 		startDate: subtractDays(new Date(), 2).setHours(0, 0, 0, 0),
	// 		endDate: new Date(),
	// 	};
	// 	dateFilters[timeKeysToSend?.startDate] = formatDateToString(
	// 		initialDateFilters?.startDate,
	// 	);
	// 	dateFilters[timeKeysToSend?.endDate] = formatDateToString(
	// 		initialDateFilters?.endDate,
	// 	);
	// }

	if (rest.type === 'superAdmins') {
		if (!isConditionMatches(CC.SHOW_SHIPMENT_STATS)) {
			return null;
		}
	}

	if (listLoading) {
		return <Loading />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.stats_container}>
				{(stats || []).map((stat) => (
					<Stats
						key={stat?.key}
						{...(stat || {})}
						count={
							stat?.key !== 'total_count'
								? statsData?.[stat?.key]
								: statsData?.[stat?.key] - (statsData?.not_sent || 0)
						}
						isActive={activeStat?.key === stat?.key}
						onClick={() => {
							setFilters({
								...(restFilters || {}),
								activeStat : stat,
								page       : 1,
								page_limit : 10,
							});
							setBucketParams(stat.params || {});
						}}
					/>
				))}
			</div>

			<div className={styles.table}>
				<Table
					fields={fields}
					activeTab={rest?.type}
					loading={listLoading}
					data={listData}
					activeStat={activeStat}
					restFilters={restFilters}
					setFilters={setFilters}
					heading={heading}
					placement={placement}
				/>
			</div>

		</div>
	);
}

export default List;
