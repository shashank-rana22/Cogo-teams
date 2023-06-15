import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';
import useDeleteSubChapter from './useDeleteSubChapter';

const DEFAULT_PAGE = 1;

const useSubChapter = () => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [showDeleteModal, setShowDeleteModal] = useState('');
	const [showUpdateSubChapterModal, setShowUpdateSubChapterModal] = useState();

	const [{ loading, data }, trigger] = useHarbourRequest({
		url    : '/list_all_sub_chapters',
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

	const { deleteSubChapter, loading: deleteLoading } = useDeleteSubChapter({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
	});

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const columns = getColumns({ setShowDeleteModal, setShowUpdateSubChapterModal });

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
		setShowUpdateSubChapterModal,
		showUpdateSubChapterModal,
	};
};

export default useSubChapter;
