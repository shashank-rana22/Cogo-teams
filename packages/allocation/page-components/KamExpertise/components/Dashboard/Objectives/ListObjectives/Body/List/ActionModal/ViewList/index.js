import { Pagination, Toggle } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../../../../../common/EmptyState';
import useGetObjectiveKAMsList from '../../../../../../../../hooks/useGetObjectiveKAMsList';

import Filters from './Filters';
import List from './List';
import getListColumnMapping from './list-column-mapping';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function ViewList({
	showModal = {},
}) {
	const {
		data = {},
		loading = false,
		params = {},
		setParams = () => { },
		debounceQuery = () => { },
	} = useGetObjectiveKAMsList({
		objective_id: showModal?.id,
	});

	const {
		list: KAMsList = [],
		total_count,
		page_limit,
	} = data || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		loading,
		KAMsList,
	});

	return (
		<section>
			<div className={styles.header}>
				<div className={styles.header_text}>
					{`"${startCase(showModal?.objective_title)}" Leaderboard Generated`}
				</div>
				<div>
					<Toggle
						name="toggle"
						size="md"
						onLabel="OR"
						offLabel="AND"
						value={params?.for_individual_rule}
						onChange={() => {
							setParams((pv) => ({
								...pv,
								for_individual_rule: !(pv?.for_individual_rule),
							}));
						}}
					/>
				</div>
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

			<Filters
				params={params}
				setParams={setParams}
				debounceQuery={debounceQuery}
			/>

			{isEmpty(KAMsList) ? (
				<div className={styles.empty_state}>
					<EmptyState />
				</div>
			) : (
				<>
					<ListHeader
						LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
					/>

					{(KAMsList || []).map((item) => (
						<List
							key={item}
							item={item}
							LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
							loadingKAMsList={loading}
						/>
					))}
				</>
			)}

			{total_count > page_limit ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={params?.page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(v) => {
							setParams((pv) => ({
								...pv,
								page: v,
							}));
						}}
					/>
				</div>
			) : null}

		</section>
	);
}

export default ViewList;
