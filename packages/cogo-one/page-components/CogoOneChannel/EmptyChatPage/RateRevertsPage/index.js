import { Pagination } from '@cogoport/components';
import React from 'react';

import useListRateJobs from '../../../../hooks/useListRateJobs';

import Header from './Header';
import ListRateReverts from './ListRateReverts';
import styles from './styles.module.css';

function RateRevertsPage() {
	const { setParams = () => {}, params = {}, rateJobsData = {} } = useListRateJobs({});

	const { total_items = 0, page = 1 } = rateJobsData || {};

	return (
		<>
			<div className={styles.container}>
				<Header
					params={params}
					setParams={setParams}
				/>
				<ListRateReverts />
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
		</>
	);
}

export default RateRevertsPage;
