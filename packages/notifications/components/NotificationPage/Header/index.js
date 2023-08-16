import { Pagination, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const MIN_NOT_SEEN_COUNT = 1;
const EMPTY_PAGE = 0;

function Header({
	onMarkAllAsRead = () => {},
	formattedData = {},
	onPageChange = () => {},
	activeTab,
	disabled,
}) {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>
				{formattedData?.not_seen_count > MIN_NOT_SEEN_COUNT ? `${activeTab}s` : `${activeTab}`}
				{' '}
				<span className="small">{formattedData?.not_seen_count}</span>
			</p>
			{!isEmpty(formattedData) && (
				<div className={styles.row}>
					<Button
						className={styles.mark_read}
						style={disabled ? { pointerEvents: 'none' } : {}}
						onClick={onMarkAllAsRead}
					>
						Mark all as read

					</Button>
					<div>
						<Pagination
							type="table"
							currentPage={formattedData?.page || EMPTY_PAGE}
							totalItems={formattedData?.total_count || EMPTY_PAGE}
							pageSize={formattedData?.page_limit || EMPTY_PAGE}
							onPageChange={onPageChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
export default Header;
