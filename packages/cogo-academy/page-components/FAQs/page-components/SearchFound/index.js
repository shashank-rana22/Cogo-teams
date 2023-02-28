import { Pagination } from '@cogoport/components';
import React from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';

import styles from './styles.module.css';

function SearchFound({ searchState = '' }) {
	const {
		page,
		setPage = () => {},
		paginationData,
		data,
	} = useListFaqQuestions({ searchState });

	return (
		<div>
			{data?.list.map((question) => (
				<div className={styles.border}><Questions questions={question} /></div>
			))}

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={paginationData?.total_count}
					pageSize={paginationData?.page_limit}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}

export default SearchFound;
