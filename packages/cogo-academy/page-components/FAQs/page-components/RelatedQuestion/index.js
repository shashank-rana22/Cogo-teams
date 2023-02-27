/* eslint-disable import/no-cycle */
import { Pagination } from '@cogoport/components';
import React from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestion({ tags }) {
	const tagId = tags[0].id;
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
	console.log('sas', data);

	// useEffect(() => {
	// 	refetchQuestions();
	// }, [page, searchState, topicId]);

	return (
		<div>
			<span className={styles.relatedquestion}>Related Questions</span>
			<div className={styles.title}>
				Q.
				{' '}
				{data?.list[1]?.question_abstract}
				{' '}
				?
			</div>
			<div className={styles.title}>
				Q.
				{' '}
				{data?.list[2]?.question_abstract}
				{' '}
				?
			</div>
		</div>
	);
}

export default RelatedQuestion;
