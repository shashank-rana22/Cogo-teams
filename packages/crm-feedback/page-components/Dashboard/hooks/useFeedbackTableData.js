import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

const useFeedbackTableData = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {
			cogo_entity  : undefined,
			kam          : undefined,
			kam_manager  : undefined,
			organization : undefined,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: true });

	// const onChangeParams = (values = {}) => {
	// 	console.log('params are changed');
	// 	setParams((previousState) => ({
	// 		...previousState,
	// 		...values,
	// 	}));
	// };

	const onChangeParams = useCallback((values = {}) => {
		console.log('params are changed');
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	// const onChangeFilters = (values) => {
	// 	console.log('filters are changed');
	// 	setFilters((previousState) => ({
	// 		...filters,
	// 		...previousState,
	// 		...values,
	// 	}));
	// };

	const onChangeFilters = useCallback(
		(values = {}) => {
			console.log('filters are changed');
			setFilters((previousState) => ({
				...filters,
				...previousState,
				...values,
			}));
		},
		[setFilters, filters],
	);

	useEffect(() => {
		console.log('inside the 1st useffect, params::', params);

		trigger({
			params: {
				...params,
				page    : 1,
				filters : { ...params?.filters, ...filters },
			},
		});
	}, [params, filters, trigger]);

	const { list = [], ...paginationData } = data || {};

	const currentPageListIds = useMemo(() => list?.map(({ id }) => id), [list]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));

		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	}, [currentPageListIds, selectAll]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	}, [currentPageListIds, checkedRowsId, selectAllHelper]);

	const onChangeBodyCheckbox = (event, id) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== id);
			}

			selectAllHelper(newCheckedIds);

			return newCheckedIds;
		});
	};

	const onChangeTableHeadCheckbox = (event) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = [...previousIds];

			if (event.target.checked) {
				newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
			} else {
				newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
			}

			setSelectAll(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	return {
		data: list,
		loading,
		setParams,
		paginationData,
		filters,
		onChangeFilters,
		onChangeParams,
		checkedRowsId,
		selectAll,
		onChangeTableHeadCheckbox,
		onChangeBodyCheckbox,
	};
};

export default useFeedbackTableData;
