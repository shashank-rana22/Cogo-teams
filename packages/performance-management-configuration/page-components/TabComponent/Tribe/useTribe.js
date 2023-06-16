import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteTribe from './useDeleteTribe';

const DEFAULT_PAGE = 1;
const DEFAULT_ACTIVE_TAB = 'active';

const useTribe = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showTribeModal, setShowTribeModal] = useState();
	const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : '/list_all_tribes',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page    : !search ? page : DEFAULT_PAGE,
						filters : { q: search || undefined },
						status  : activeTab,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[page, search, trigger, activeTab],
	);

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const { deleteTribe, loading: deleteLoading } = useDeleteTribe({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	const columns = getColumns({ setShowDeleteModal, setShowTribeModal });

	return {
		columns,
		search,
		setSearch,
		page,
		setPage,
		data,
		loading,
		fetchList,
		deleteTribe,
		deleteLoading,
		showDeleteModal,
		setShowDeleteModal,
		showTribeModal,
		setShowTribeModal,
		activeTab,
		setActiveTab,
	};
};

export default useTribe;
