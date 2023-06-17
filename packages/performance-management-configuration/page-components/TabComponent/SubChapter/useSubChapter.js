import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteSubChapter from './useDeleteSubChapter';

const DEFAULT_PAGE = 1;
const DEFAULT_ACTIVE_TAB = 'active';

const useSubChapter = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showSubChapterModal, setShowSubChapterModal] = useState();
	const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : '/list_all_sub_chapters',
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
		[page, trigger, search, activeTab],
	);

	const { deleteSubChapter, loading: deleteLoading } = useDeleteSubChapter({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowSubChapterModal });

	return {
		columns,
		search,
		setSearch,
		data,
		loading,
		page,
		setPage,
		fetchList,
		deleteSubChapter,
		deleteLoading,
		setShowDeleteModal,
		showDeleteModal,
		setShowSubChapterModal,
		showSubChapterModal,
		activeTab,
		setActiveTab,
	};
};

export default useSubChapter;
