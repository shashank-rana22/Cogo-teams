/* eslint-disable no-magic-numbers */
/* eslint-disable no-unsafe-optional-chaining */
import { useRequest } from '@cogoport/request';
import React, { useState, useEffect } from 'react';

import formatFields from '../../utils/format-fields';
import getSalesDashboardListStats from '../../utils/getSalesDashboardListStats';

import Stats from './Stats';
import styles from './styles.module.css';

function List({
	importer_exporter_id,
	heading = '',
	fields = [],
	api = '',
	apiScope = '',
	stats = [],
	placement = 'center',
	setSelectedRow = () => {},
	authkey = '',
	...rest
}) {
	const isRateList = ['missing_rates', 'disliked_rates'].includes(rest?.type);

	const [serviceType, setServiceType] = useState(() => (isRateList ? 'fcl_freight' : null));
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		activeStat : stats?.[0] || {},
	});
	const [extraParams, setExtraParams] = useState(rest?.extraParams || {});
	const [bucketParams, setBucketParams] = useState({});

	let newApi = !isRateList
		? api
		: [rest?.apiPrefix, serviceType, rest?.apiSuffix].join('_');

	if (serviceType === 'fcl_freight_local' && isRateList) {
		newApi = 'list_fcl_freight_rate_local_requests';
	}

	const [{ loading, data }, trigger] = useRequest({
		url    : newApi,
		method : 'get',
	}, { manual: true });

	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	const statsData = getSalesDashboardListStats({
		data,
		rest,
		stats,
	});

	useEffect(() => {
		setFilters({
			page       : 1,
			activeStat : stats.find((stat) => stat.is_default) || stats[0] || {},
		});
	}, []);

	return (
		<div className={styles.container}>
			{/* <div className={styles.header}>
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
						});
					}}
				/>
			</div> */}

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

		</div>
	);
}

export default List;
