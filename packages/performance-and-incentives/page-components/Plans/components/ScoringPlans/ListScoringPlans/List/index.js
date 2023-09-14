import { Table, Pagination } from '@cogoport/components';
import { useState } from 'react';

import ActivationModal from './ActivationModal';
import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { list = [], paginationData, getNextPage, loading, refetch } = props;

	const [activeActionId, setActiveActionId] = useState(null);

	const [showActivationModal, setShowActivationModal] = useState(false);

	const { page, total_count, page_limit } = paginationData || {};

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		activeActionId,
		setActiveActionId,
		refetch,
		showActivationModal,
		setShowActivationModal,
	});

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
