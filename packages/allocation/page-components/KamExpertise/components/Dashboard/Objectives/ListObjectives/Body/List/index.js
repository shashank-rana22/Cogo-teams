import { Collapse, Pagination } from '@cogoport/components';
import { useState, useMemo } from 'react';

import ObjectiveDetailsCard from '../../../../../../common/ObjectiveDetailsCard';

import ActionModal from './ActionModal';
import ListCard from './ListCard';
import getListColumnMapping from './ListCard/get-list-column-mapping';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function List(props) {
	const {
		setActionMode = () => { },
		data = {},
		page,
		setPage = () => { },
		loadingListObjectives = false,
		setListObjectivesParams = () => { },
		refetchListObjectives = () => { },
	} = props;

	const {
		list = [],
		page_limit,
		total_count,
	} = data || {};

	const [activeObjectiveId, setActiveObjectiveId] = useState(null);

	const [showModal, setShowModal] = useState({ id: '', action: 'generate' });

	const [filters, setFilters] = useState({});

	const LIST_COLUMN_MAPPING = getListColumnMapping({
		setActionMode,
		setShowModal,
		activeObjectiveId,
		setActiveObjectiveId,
		setListObjectivesParams,
	});

	const objectiveList = useMemo(() => (list || []).map((item) => ({
		key      : item.id,
		children : <ObjectiveDetailsCard activeObjectiveId={item.id} />,
		title    : <ListCard
			listItem={item}
			loadingListObjectives={loadingListObjectives}
			LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
		/>,
	})), [LIST_COLUMN_MAPPING, list, loadingListObjectives]);

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
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
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
