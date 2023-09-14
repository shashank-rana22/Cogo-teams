import { Pagination, Toggle } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['allocation']);

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
		list: kamsList = [],
		total_count,
		page_limit,
	} = data || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		t,
	});

	return (
		<section>
			<div className={styles.header}>
				<div className={styles.header_text}>
					{`"${startCase(showModal?.objective_title)}" ${t('allocation:leaderboard_generated')}`}
				</div>
				<div>
					<Toggle
						name="toggle"
						size="md"
						onLabel={t('allocation:or_label')}
						offLabel={t('allocation:and_label')}
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
				{t('allocation:view_list_phrase')}
				{' '}
				<strong>
					‘
					{t('allocation:delete_list')}
					’
				</strong>
				{' '}
				{t('allocation:from_the_table')}
			</div>

			<Filters
				params={params}
				setParams={setParams}
				debounceQuery={debounceQuery}
			/>

			{isEmpty(kamsList) ? (
				<div className={styles.empty_state}>
					<EmptyState />
				</div>
			) : (
				<>
					<ListHeader
						LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
					/>

					{(kamsList || []).map((item) => (
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
