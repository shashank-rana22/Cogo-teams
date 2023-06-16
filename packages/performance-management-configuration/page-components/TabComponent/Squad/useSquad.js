import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteSquad from './useDeleteSquad';

const DEFAULT_PAGE = 1;

const useSquad = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showUpdateSquadModal, setShowUpdateSquadModal] = useState();
	const [activeTab, setActiveTab] = useState('active');

	const [{ loading, data }, trigger] = useHarbourRequest(
		{
			url    : '/list_all_squads',
			method : 'GET',
		},
		{ manual: true },
	);

	const fetchList = useCallback(async () => {
		try {
			await trigger({
				params: {
					page    : !search ? page : DEFAULT_PAGE,
					filters : { q: search || undefined },
					status  : activeTab,
				},
			});
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data) || 'Something went wrong',
			);
		}
	}, [page, search, trigger, activeTab]);
	const { deleteSquad, loading: deleteLoading } = useDeleteSquad({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowUpdateSquadModal });

	return {
		columns,
		search,
		setSearch,
		page,
		setPage,
		data,
		loading,
		deleteSquad,
		deleteLoading,
		showDeleteModal,
		setShowDeleteModal,
		showUpdateSquadModal,
		setShowUpdateSquadModal,
		activeTab,
		setActiveTab,
	};
};

export default useSquad;
