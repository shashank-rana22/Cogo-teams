import { Pagination, Button } from '@cogoport/components';
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
				<Button className={styles.mark_read} onClick={onMarkAllAsRead}>Mark all as read</Button>
				<div>
					<Pagination
						type="table"
						currentPage={formattedData?.page}
						totalItems={formattedData?.total_count}
						pageSize={formattedData?.page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			</div>
		</div>
	);
}
export default Header;
