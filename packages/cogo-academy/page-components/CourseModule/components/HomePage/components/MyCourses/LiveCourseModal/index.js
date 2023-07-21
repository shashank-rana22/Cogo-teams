import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../../../commons/StyledTable';

import getColumns from './getColumns';
import useListCourseVideos from './useListCourseVideos';

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

function LiveCourseModal() {
	const {
		loading,
		list,
		page,
		setPage,
		paginationData,
	} = useListCourseVideos();

	const { total_count, page_limit } = paginationData || {};
	const columns = getColumns({ onClickOpen });

	return (
		<div>
			<StyledTable columns={columns} data={list} loading={loading} />
			{total_count > page_limit ? (
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			) : null}
		</div>
	);
}

export default LiveCourseModal;
