import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../common/EmptyState';

import ListItem from './ListItem';
import LeaderboardLoading from './ListItem/loadingState';
import styles from './styles.module.css';

function LeaderboardList(props) {
	const {
		leaderboardLoading = false,
		leaderboardList = [],
		paginationData,
		getNextPage,
	} = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	if ((leaderboardLoading)) {
		return <LeaderboardLoading leaderboardList={leaderboardList} />;
	}

	if (isEmpty(leaderboardList)) {
		return (
			<div className={styles.empty_state}>
				<EmptyState
					width={450}
					height={250}
					flexDirection="column"
					textSize="20px"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			{leaderboardList.map((data, index) => (
				<ListItem data={data} index={index} />
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default LeaderboardList;
