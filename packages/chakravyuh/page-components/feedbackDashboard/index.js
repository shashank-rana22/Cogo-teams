import { Loader, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import useGetFeedbackList from '../../hooks/useGetFeedbackList';

import FeedbackCard from './FeedbackCard';
import Filters from './Filters';
import styles from './styles.module.css';

function FeedbackDashboard() {
	const [filters, setFilters] = useState({ page: 1 });
	const { data = {}, loading, page } = useGetFeedbackList({ filters, setFilters });
	const { list = [] } = data;

	return (
		<>
			<div>
				<p className={styles.main_heading}>Feedback Dashboard</p>
				<Filters filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.container}>
				{!isEmpty(list) && (
					<Pagination
						type="table"
						currentPage={page}
						totalItems={data?.total_count}
						pageSize={data?.page_limit}
						onPageChange={(newPage) => {
							setFilters((prev) => ({ ...prev, page: newPage }));
						}}
					/>
				)}
				<div className={styles.list_panel}>
					<div>
						{loading ? <Loader /> : null}
					</div>
					{(!loading && isEmpty(list)) ? <EmptyState />
						: (
							<>
								{list.map((item) => <FeedbackCard data={item} key={item.id} />)}
							</>
						)}
				</div>
			</div>
		</>
	);
}
export default FeedbackDashboard;
