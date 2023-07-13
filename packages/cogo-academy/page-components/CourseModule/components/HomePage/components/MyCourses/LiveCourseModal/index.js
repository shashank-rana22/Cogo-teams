import { Button, Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import useListCourseVideos from './useListCourseVideos';

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

function LiveCourseModal() {
	const {
		data,
		loading,
		page,
		setPage,
		paginationData,
	} = useListCourseVideos();

	const { total_count, page_limit } = paginationData || {};

	return (
		<div>
			{data?.list?.map((item) => (
				<div key={item} className={styles.course_list}>
					{startCase(item?.video_name)}
					<Button
						size="sm"
						onClick={() => onClickOpen(item?.video_link)}
						loading={loading}
					>
						OPEN
					</Button>

				</div>
			))}

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
