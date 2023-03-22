import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../../../../../commons/StyledTable';

import styles from './styles.module.css';
import useAllQuestions from './useAllQuestions';

function AllQuestions(props) {
	const { data, paginationData, page, setPage = () => {}, sortType, setSortType } = props;
	const { total_count, page_limit } = paginationData;

	const { columns, data: tableData } = useAllQuestions({ listdata: data?.list, sortType, setSortType });

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={tableData} />

			<Pagination
				style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', paddingRight: '12px' }}
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={setPage}
			/>
		</div>
	);
}

export default AllQuestions;
