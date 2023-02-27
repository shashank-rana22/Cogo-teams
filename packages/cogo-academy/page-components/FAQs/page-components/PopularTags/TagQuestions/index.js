import { Input, Modal, Button, Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListFaqQuestions from '../../../hooks/useListFaqQuestion';
import Questions from '../../Questions';

import styles from './styles.module.css';

function TagQuestions({ tagId = [] }) {
	// const [show, setShow] = useState(false);
	// const [searchState, setSearchState] = useState('');
	
	const {
		page,
		setPage = () => {},
		paginationData,
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
		topicId,
	} = useListFaqQuestions({ tagId });

	// useEffect(() => {
	// 	refetchQuestions();
	// }, [page, searchState, topicId]);

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

export default TagQuestions;
