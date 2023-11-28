import { useState, useEffect } from 'react';

import useGetSalesDashboardData from '../../../hooks/useGetSalesDashboardData';

import Header from './Header';
import Statistics from './Statistics';
import styles from './styles.module.css';
import Table from './Table';

function List({
	importer_exporter_id = '',
	service_type = '',
	heading = '',
	fields = [],
	api = '',
	stats = [],
	placement = 'center',
	...rest
}) {
	const [serviceType, setServiceType] = useState(service_type || 'fcl_freight');

	let finalApi = api;

	const isRateList = ['missing_rates', 'disliked_rates'].includes(rest?.type);

	if (isRateList) {
		finalApi = [rest.apiPrefix, serviceType, rest.apiSuffix].join('_');
	}

	if (serviceType === 'fcl_freight_local' && isRateList) {
		finalApi = 'list_fcl_freight_rate_local_requests';
	}

	const {
		statsData,
		listData,
		loading: listLoading,
		filters,
		setFilters,
		setBucketParams,
	} = useGetSalesDashboardData({ serviceType, api: finalApi, stats, importer_exporter_id, ...rest });

	const { page, page_limit, activeStat, ...restFilters } = filters || {};

	useEffect(() => {
		setServiceType(service_type || 'fcl_freight');
	}, [service_type]);

	return (
		<div className={styles.container}>
			{['most_searched', 'most_booked'].includes(rest.type) ? null : (
				<div className={styles.header_wrapper}>
					<Statistics
						statsArray={stats}
						statsData={statsData}
						setFilters={setFilters}
						setBucketParams={setBucketParams}
						activeStat={activeStat}
						restFilters={restFilters}
						loading={listLoading}
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
						isRateList={isRateList}
					/>
				</div>
			)}

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
					serviceType={serviceType}
					placement={placement}
				/>
			</div>
		</div>
	);
}

export default List;
