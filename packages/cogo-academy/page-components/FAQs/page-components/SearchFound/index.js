import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyQuestionListState from '../../../../commons/EmptyQuestionListState';
import Spinner from '../../../../commons/Spinner';
import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';

import styles from './styles.module.css';

function SearchFound({ searchState = '' }) {
	const {
		page,
		setPage = () => {},
		paginationData,
		data,
		loading,
	} = useListFaqQuestions({ searchState });

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={40}
					width={40}
					borderWidth="7px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	if (isEmpty(data?.list) && !loading) {
		return <EmptyQuestionListState searchState={searchState} />;
	}

	return (
		<div>
			{(data?.list || []).map((question) => (
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
