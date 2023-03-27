import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

const useFeedbackTableData = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [selectedBulkData, setSelectedBulkData] = useState([{}]);

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: false });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	const onChangeFilters = useCallback(
		(values = {}) => {
			setFilters((previousState) => ({
				...previousState,
				...values,
			}));
			setParams((previousState) => ({
				...previousState,
				filters: {
					...previousState.filters,
					...values,
				},
			}));
		},
		[setFilters, setParams],
	);

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

	const onBulkDataPayload = () => {
		const bulkData = list
			.filter((item) => checkedRowsId.includes(item.id))
			.map(({ source_id, source_type, organization_id, lead_organization_id, partner_id }) => ({
				source_id,
				source       : source_type,
				organization_id,
				lead_organization_id,
				partner_id,
				request_type : 'enrichment',
			}));

		setSelectedBulkData(bulkData);
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
		selectedBulkData,
		onBulkDataPayload,
	};
};

export default useFeedbackTableData;
