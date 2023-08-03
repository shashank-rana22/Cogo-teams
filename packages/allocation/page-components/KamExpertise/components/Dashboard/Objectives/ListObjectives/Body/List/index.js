import { Collapse, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../../common/EmptyState';

import ActionModal from './ActionModal';
import ListHeader from './ListHeader';
import styles from './styles.module.css';
import useList from './useList';

const ONE = 1;

function List(props) {
	const {
		LIST_COLUMN_MAPPING,
		objectiveList,
		activeObjectiveId,
		setActiveObjectiveId,
		params,
		total_count,
		page_limit,
		handlePageChange,
		showModal,
		setShowModal,
		filters,
		setFilters,
		refetchListObjectives,
	} = useList(props);

	if (isEmpty(objectiveList)) {
		return (
			<EmptyState
				height="400px"
				width="600px"
				flexDirection="column"
				emptyText="Objectives list not found"
			/>
		);
	}

	return (
		<section>
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			<div className={styles.collapse}>
				<Collapse
					panels={objectiveList}
					type="card"
					activeKey={activeObjectiveId}
					setActive={setActiveObjectiveId}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={params?.page || ONE}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(v) => handlePageChange(v)}
				/>
			</div>

			<ActionModal
				showModal={showModal}
				setShowModal={setShowModal}
				filters={filters}
				setFilters={setFilters}
				refetchListObjectives={refetchListObjectives}
			/>
		</section>
	);
}

export default List;
