import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../../../../../commons/StyledTable';

import styles from './styles.module.css';
import useAllQuestions from './useAllQuestions';

function AllQuestions(props) {
	const { paginationData, page, setPage, data, sortType, setSortType } = props;
	const { page_limit, total_count } = paginationData;

	const { columns, data: tableData } = useAllQuestions({ listdata: data?.list, sortType, setSortType });

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={tableData} />

			<Pagination
				style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', paddingRight: '12px' }}
				type="page"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={setPage}
			/>

		</div>
	);
}

export default AllQuestions;
