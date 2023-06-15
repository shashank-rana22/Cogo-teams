import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteChapter from './useDeleteChapter';

const DEFAULT_PAGE = 1;

const useChapter = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showUpdateChapterModal, setShowUpdateChapterModal] = useState();

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : '/list_all_chapters',
		method : 'GET',
	}, { manual: true });

	const fetchList = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						page,
					},
				});
			} catch (error) {
				Toast.error(error?.data);
			}
		},
		[page, trigger],
	);

	const { deleteChapter, loading: deleteLoading } = useDeleteChapter({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowUpdateChapterModal });

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
		showUpdateChapterModal,
		setShowUpdateChapterModal,
	};
};

export default useChapter;
