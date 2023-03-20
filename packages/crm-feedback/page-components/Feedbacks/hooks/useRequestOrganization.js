import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

const useRequestOrganization = ({ organization_id = '' }) => {
	const router = useRouter();

	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {
			organization_id,
		},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: true });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	useEffect(() => {
		trigger({
			params: {
				...params,
			},
		});
	}, [params, trigger]);

	const dummyData = [
		{
			id              : 'something1',
			serial_id       : '1',
			organization    : 'Some Organization 1',
			organization_id : 'anmolbansal',
			created_at      : '2023-03-13T08:09:59.087Z',
			response_date   : '2023-03-13T08:09:59.087Z',
			status          : 'response_received',
		},
		{
			id            : 'something2',
			serial_id     : '2',
			organization  : 'Some Organization 2',
			created_at    : '2023-03-13T08:09:59.087Z',
			response_date : null,
			status        : 'request_created',
		},
		{
			id            : 'something3',
			serial_id     : '3',
			organization  : 'Some Organization 3',
			created_at    : '2023-03-13T08:09:59.087Z',
			response_date : '2023-03-13T08:09:59.087Z',
			status        : 'deactivated',
		},
	];

	const paginationData = {
		page        : 1,
		page_limit  : 10,
		total       : 1,
		total_count : 2,
	};

	// const { list = [], ...paginationData } = data || {};

	const list = dummyData;

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

	const deactivateRequest = () => {
		alert('Deactivate Request');
	};

	const viewRequest = () => {
		alert('View Response');
	};

	const handleButtonClick = ({ status }) => {
		if (status === 'request_created') {
			deactivateRequest();
		} else if (status === 'response_received') {
			viewRequest();
		}
	};

	return {
		data: list,
		loading,
		router,
		setParams,
		paginationData,
		onChangeParams,
		checkedRowsId,
		selectAll,
		onChangeTableHeadCheckbox,
		onChangeBodyCheckbox,
		handleButtonClick,
	};
};

export default useRequestOrganization;
