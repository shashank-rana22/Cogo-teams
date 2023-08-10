import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_ACTIVE_TAB = 'active';

const useTableComponent = ({ getColumns = () => {}, source = '' }) => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showCreateModal, setShowCreateModal] = useState();
	const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : source !== 'employee' ? `/list_all_${source}s` : `list_${source}_details`,
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page    : !search ? page : DEFAULT_PAGE,
						filters : {
							q      : search || undefined,
							status : activeTab,
						},
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[page, search, trigger, activeTab],
	);

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowCreateModal, activeTab });

	return {
		columns,
		search,
		setSearch,
		page,
		setPage,
		data,
		loading,
		fetchList,
		showDeleteModal,
		setShowDeleteModal,
		showCreateModal,
		setShowCreateModal,
		activeTab,
		setActiveTab,
	};
};

export default useTableComponent;
