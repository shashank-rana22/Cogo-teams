import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

const useGetLeadData = () => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
	});

	const [selectAll, setSelectAll] = useState(false);

	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading }] = useRequest({
		url    : '/list_leads',
		method : 'get',
		params,
	}, { manual: false });

	const { list: response = [], ...paginationData } = data || {};
	const currentPageListIds = useMemo(() => response?.map(({ id }) => id), [response]);

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

	const { control, reset, watch } = useForm();

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		const subscription = watch((value) => {
			const {
				objective_id,
				services,
				origin_country_port,
				destination_country_port,
			} = value;

			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					objective_filters: {
						...(previousParams.filters.objective_filters || undefined),
						objective_id: isEmpty(objective_id) ? undefined : objective_id,
					},
					shipment_filters: {
						...(previousParams.filters.shipment_filters || undefined),
						origin_port_id      : origin_country_port || undefined,
						destination_port_id : destination_country_port || undefined,
					},
					services: (services === 'null' ? null : (services || undefined)),
				},
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setParams]);

	return {
		loading,
		response: (response || []),
		control,
		debounceQuery,
		reset,
		setParams,
		paginationData,
		checkedRowsId,
		selectAll,
		onChangeTableHeadCheckbox,
		onChangeBodyCheckbox,
		params,
	};
};

export default useGetLeadData;
