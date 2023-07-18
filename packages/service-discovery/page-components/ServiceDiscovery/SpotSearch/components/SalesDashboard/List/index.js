import React, { useState } from 'react';

import useGetSalesDashboardData from '../../../hooks/useGetSalesDashboardData';
import CC from '../../../utils/condition-constants';

import Header from './Header';
import Statistics from './Statistics';
import styles from './styles.module.css';
import Table from './Table';

function List({
	importer_exporter_id,
	heading = '',
	fields = [],
	api = '',
	stats = [],
	placement = 'center',
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
		setBucketParams,
	} = useGetSalesDashboardData({ serviceType, isRateList, api, stats, importer_exporter_id, ...rest });

	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	if (rest.type === 'superAdmins') {
		if (!isConditionMatches(CC.SHOW_SHIPMENT_STATS)) {
			return null;
		}
	}

	return (
		<div className={styles.container}>

			<div className={styles.header_wrapper}>
				<Statistics
					statsArray={stats}
					statsData={statsData}
					setFilters={setFilters}
					setBucketParams={setBucketParams}
					activeStat={activeStat}
					restFilters={restFilters}
				/>

				<Header
					{...(rest || {})}
					heading={heading}
					filters={restFilters}
					serviceType={serviceType}
					setServiceType={setServiceType}
					setFilters={(val) => {
						setFilters({
							...(restFilters || {}),
							...(val || {}),
							activeStat,
							page_limit,
							page: 1,
						});
					}}
				/>
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
