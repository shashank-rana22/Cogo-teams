import { Collapse, Pagination, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import EmptyState from '../../../../../../../common/EmptyState';

import ACTION_COMPONENT_MAPPING from './get-action-component-mapping';
import ListCard from './ListCard';
import getListColumnMapping from './ListCard/get-list-column-mapping';
import ListChildCard from './ListChildCard';
import ListHeader from './ListHeader';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function List(props) {
	const { setActiveMode, loading, list, paginationData, getNextPage, setRefCallback } = props;

	const { page, total_count, page_limit } = paginationData || {};

	const [activeObjectiveId, setActiveObjectiveId] = useState(null);

	const [showActionModal, setShowActionModal] = useState({});

	const LIST_COLUMN_MAPPING = getListColumnMapping({ setActiveMode, setShowActionModal, setRefCallback });

	const objectiveList = useMemo(() => (list || []).map((item) => ({
		key      : item.id,
		children : <ListChildCard activeObjectiveId={activeObjectiveId} />,
		title    : <ListCard
			listItem={item}
			LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
		/>,
	})), [activeObjectiveId, list, LIST_COLUMN_MAPPING]);

	if (loading) return <LoadingState />;

	if (isEmpty(objectiveList)) {
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
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			<Collapse
				className={styles.collapse}
				panels={objectiveList}
				type="card"
				activeKey={activeObjectiveId}
				setActive={setActiveObjectiveId}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>

			{!isEmpty(showActionModal) && (
				<Modal
					size="sm"
					show={!isEmpty(showActionModal)}
					onClose={() => setShowActionModal({})}
					closeOnOuterClick
					showCloseIcon
					animate
				>
					{ACTION_COMPONENT_MAPPING[showActionModal.mode]
						?.render({ objectiveId: showActionModal.objectiveId, setShowActionModal })}
				</Modal>
			)}
		</>
	);
}

export default List;
