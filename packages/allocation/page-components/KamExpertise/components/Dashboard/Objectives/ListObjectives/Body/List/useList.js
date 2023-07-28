import { useState, useMemo } from 'react';

import ObjectiveDetailsCard from '../../../../../../common/ObjectiveDetailsCard';

import ListCard from './ListCard';
import getListColumnMapping from './ListCard/get-list-column-mapping';

const ONE = 1;

function useList(props) {
	const {
		setActionMode = () => { },
		data = {},
		// page,
		// setPage = () => { },
		params = {},
		setParams = () => { },
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

	const handlePageChange = (pg) => {
		setParams((pv) => ({
			...pv,
			page: pg + ONE,
		}));
	};

	return {
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
	};
}

export default useList;
