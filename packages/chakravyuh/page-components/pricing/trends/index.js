import { Loader, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import MapsUi from '../../../common/maps';

import Filter from './Filters';
import styles from './styles.module.css';
import Trend from './Trend';
import TrendDetails from './TrendDetails';
import useGetPricingTrends from './useGetPricingTrends';

function PricingTrends() {
	const [activeTrend, setActiveTrend] = useState(null);
	const {
		loading,
		data,
		setFilters,
		filters,
		page,
	} = useGetPricingTrends();
	const list = data?.list || [];
	return (
		<div className={styles.container}>
			<p className={styles.heading}>Pricing Trends</p>
			<Filter setFilters={setFilters} filters={filters} />
			<div className={styles.row}>
				<div className={styles.sidepanel}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={data?.total_count}
						pageSize={data?.page_limit}
						onPageChange={(newPage) => setFilters({ ...filters, page: newPage })}
					/>
					<div className={styles.side_list}>
						{loading ? <Loader /> : null}
						{list.map((trend) => <Trend trend={trend} key={trend.id} onClick={setActiveTrend} />)}
					</div>
				</div>
				<div className={styles.view}>
					<MapsUi />
					{activeTrend ? <TrendDetails activeTrend={activeTrend} setActiveTrend={setActiveTrend} /> : null}
				</div>

			</div>

		</div>
	);
}

export default PricingTrends;
