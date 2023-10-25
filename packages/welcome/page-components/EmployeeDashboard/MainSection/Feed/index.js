import { Pagination } from '@cogoport/components';
import React from 'react';

import FeedPosts from './FeedPosts';
import Post from './Post';
import Poster from './Poster';
import styles from './styles.module.css';

function Feed({ data = {}, feedRefetch, setFilters, summaryData }) {
	const { total_count, page } = data || {};
	const { user_role } = summaryData || {};

	return (
		<div className={styles.container}>
			{user_role !== 'employee' && (
				<>
					<Post feedRefetch={feedRefetch} data={data} />
					<Poster />
				</>
			)}
			<FeedPosts data={data} feedRefetch={feedRefetch} />
			<div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={5}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
				/>
			</div>
		</div>
	);
}

export default Feed;
