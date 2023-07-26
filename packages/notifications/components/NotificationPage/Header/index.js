import { Pagination } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const MIN_NOT_SEEN_COUNT = 1;

function Header({
	onMarkAllAsRead = () => {},
	formattedData = {},
	onPageChange = () => {},
	activeTab,
}) {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>
				{formattedData?.not_seen_count > MIN_NOT_SEEN_COUNT ? `${activeTab}s` : `${activeTab}`}
				{' '}
				<span className="small">{formattedData?.not_seen_count}</span>
			</p>
			<div className={styles.row}>
				<button className={styles.mark_read} onClick={onMarkAllAsRead}>Mark all as read</button>
				<div>
					<Pagination
						page={formattedData?.page}
						total={formattedData?.total_count}
						pageLimit={formattedData?.page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			</div>
		</div>
	);
}
export default Header;
