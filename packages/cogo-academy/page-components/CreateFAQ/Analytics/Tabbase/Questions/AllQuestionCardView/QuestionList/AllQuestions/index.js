import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../../../../commons/StyledTable';

import styles from './styles.module.css';
import useAllQuestions from './useAllQuestions';

function AllQuestions(props) {
	const {
		data = {},
		paginationData = {},
		page, setPage = () => {},
		sortType,
		setSortType = () => {},
	} = props;
	const { total_count = 0, page_limit = 0 } = paginationData || {};

	const { columns, data: tableData } = useAllQuestions({ listdata: data?.list, sortType, setSortType });
	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={tableData} />

			<div className={styles.pagination_wrapper}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>

		</div>
	);
}

export default AllQuestions;
