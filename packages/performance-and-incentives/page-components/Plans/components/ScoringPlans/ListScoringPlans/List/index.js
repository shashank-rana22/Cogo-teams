import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ActivationModal from '../../commons/ActivationModal';
import EmptyState from '../../commons/EmptyState';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { list = [], paginationData, getNextPage, loading, refetch, params = {}, setParams } = props;

	const [activeActionId, setActiveActionId] = useState(null);

	const [showActivationModal, setShowActivationModal] = useState(false);

	const { page, total_count, page_limit } = paginationData || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		params,
		refetch,
		setParams,
		activeActionId,
		setActiveActionId,
		showActivationModal,
		setShowActivationModal,
	});

	if (!loading && isEmpty(list)) {
		return (
			<EmptyState
				flexDirection="column"
				height={400}
				width={700}
				textSize={24}
			/>
		);
	}

	return (
		<>
			<div className={styles.table_container}>
				<Table
					className={styles.scoring_plans_table}
					columns={LIST_COLUMN_MAPPING}
					data={list}
					loading={loading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>

			{showActivationModal ? (
				<ActivationModal
					refetch={refetch}
					activeActionId={activeActionId}
					setActiveActionId={setActiveActionId}
					setShowActivationModal={setShowActivationModal}
				/>
			) : null}

		</>
	);
}

export default List;
