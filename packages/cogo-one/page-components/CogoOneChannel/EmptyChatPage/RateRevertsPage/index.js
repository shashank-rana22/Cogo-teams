import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import useListRateJobs from '../../../../hooks/useListRateJobs';

import FilersModal from './FilersModal';
import Header from './Header';
import ListRateReverts from './ListRateReverts';
import styles from './styles.module.css';

function RateRevertsPage() {
	const [showFilters, setShowFilters] = useState(false);

	const { setParams = () => {}, params = {}, rateJobsData = {} } = useListRateJobs({});

	const { total_items = 0, page = 1, list = [] } = rateJobsData || {};

	return (
		<>
			<div className={styles.container}>
				<Header
					params={params}
					setParams={setParams}
					setShowFilters={setShowFilters}
				/>
				<ListRateReverts list={list} />
			</div>
			<div className={styles.footer_bar}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_items}
					pageSize={6}
					onPageChange={() => setParams((prev) => ({ ...prev, page: page + 1 }))}
				/>
			</div>
			<FilersModal
				showFilters={showFilters}
				setFilter={setParams}
				filter={params}
				setShowFilters={setShowFilters}
				source={params?.source}
			/>
		</>
	);
}

export default RateRevertsPage;
