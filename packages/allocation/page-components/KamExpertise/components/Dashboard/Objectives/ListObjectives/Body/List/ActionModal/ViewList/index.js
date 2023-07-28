import { Pagination } from '@cogoport/components';
import React from 'react';

import useGetObjectiveKAMsList from '../../../../../../../../hooks/useGetObjectiveKAMsList';

import Filters from './Filters';
import List from './List';
import getListColumnMapping from './list-column-mapping';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function ViewList({
	filters = {},
	setFilters = () => { },
	showModal = {},
}) {
	const {
		data = {},
		loading = false,
		page = 1,
		setPage = () => { },
		// params = {},
		// setParams = () => { },
		// fetch = () => { },
	} = useGetObjectiveKAMsList({
		objective_id: showModal?.id,
	});

	const { list: KAMsList = [], total_count, page_limit } = data || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		loading,
		KAMsList,
	});

	return (
		<section>
			<div className={styles.header_text}>
				“Objective 1” Leaderboard Generated
			</div>
			<div className={styles.description_text}>
				If you want to be able to Regenerate Updated list,
				delete this list by clicking on
				{' '}
				<strong>
					‘Delete List’
				</strong>
				{' '}
				from the table.
			</div>

			<Filters filters={filters} setFilters={setFilters} />

			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			{(KAMsList || []).map((item) => (
				<List
					key={item}
					item={item}
					LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
				/>
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>

		</section>
	);
}

export default ViewList;
