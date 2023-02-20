import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const useListAllocationRequests = () => {
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const [params, setParams] = useState({
		sort_by       : 'created_at',
		sort_type     : 'desc',
		page_limit    : 10,
		page          : 1,
		data_required : true,
		filters       : {
			status       : 'pending',
			service_type : 'organization',
		},
	});

	const apiData = useAllocationRequest({
		url     : '/requests',
		method  : 'get',
		authkey : 'get_allocation_requests',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = apiData;

	const onChangeParams = useCallback((values = {}) => {
		setParams((pv) => ({
			...pv,
			...values,
		}));
	}, []);

	useEffect(() => {
		if (searchQuery) {
			setParams((pv) => ({
				...pv,
				filters: {
					...pv.filters,
					q: searchQuery || undefined,
				},
			}));
		}
	}, [searchQuery]);

	const applyBulkFilter = async () => {
		setParams({
			...params,
			page    : 1,
			filters : {
				...params.filters,
				id : checkedRowsId,
				q  : searchQuery || undefined,
			},
		});
	};

	const onSelectAll = (val) => {
		const listIds = (data.list || []).map(({ id }) => id);

		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = previousIds;

			if (val) {
				listIds.forEach((listId) => {
					if (!previousIds.includes(listId)) {
						newCheckedRowsIds.push(listId);
					}
				});
			} else {
				newCheckedRowsIds = previousIds.filter((previousId) => !listIds.includes(previousId));
			}

			return newCheckedRowsIds;
		});
	};

	const onChangeCheckbox = (e) => {
		if (!e.target.checked) {
			setCheckedRowsId([]);
			setSelectAll('');
			if (!isEmpty(checkedRowsId)) {
				setParams((pv) => ({
					...pv,
					filters: {
						...(pv.filters || {}),
						id: undefined,
					},
				}));
			}
		}
	};

	const onClearSelection = () => {
		setCheckedRowsId([]);

		setParams((pv) => ({
			...pv,
			filters: {
				...(pv.filters || {}),
				id: undefined,
			},
		}));

		setSelectAll(false);
	};

	const onItemChangeInChips = (val) => {
		setSelectAll(val);
		onSelectAll(val);
	};

	return {
		data,
		loading,
		refetch,
		params,
		setParams,
		onChangeParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		onClearSelection,
		applyBulkFilter,
		onChangeCheckbox,
		onSelectAll,
		checkedRowsId,
		setCheckedRowsId,
		selectAll,
		onItemChangeInChips,
	};
};

export default useListAllocationRequests;
