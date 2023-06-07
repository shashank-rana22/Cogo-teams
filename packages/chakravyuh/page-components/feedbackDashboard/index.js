import { Loader, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

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
			<div className={styles.list_panel}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={data?.total_count}
					pageSize={data?.page_limit}
					onPageChange={(newPage) => {
						setFilters((prev) => ({ ...prev, page: newPage }));
					}}
				/>
				{/* {list.map((item) => <FeedbackCard data={item} key={item.id} />)} */}
				<FeedbackCard data={list[0]} />
			</div>
			<div>
				{loading ? <Loader /> : null}
			</div>
		</>
	);
}
export default FeedbackDashboard;
