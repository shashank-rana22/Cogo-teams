import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteChapter from './useDeleteChapter';

const DEFAULT_PAGE = 1;
const DEFAULT_ACTIVE_TAB = 'active';

const useChapter = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showChapterModal, setShowChapterModal] = useState();
	const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : '/list_all_chapters',
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
				Toast.error(error?.data);
			}
		},
		[page, trigger, search, activeTab],
	);

	const { deleteChapter, loading: deleteLoading } = useDeleteChapter({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowChapterModal });

	return {
		columns,
		search,
		setSearch,
		data,
		loading,
		page,
		setPage,
		fetchList,
		deleteChapter,
		deleteLoading,
		showDeleteModal,
		setShowDeleteModal,
		showChapterModal,
		setShowChapterModal,
		activeTab,
		setActiveTab,
	};
};

export default useChapter;
