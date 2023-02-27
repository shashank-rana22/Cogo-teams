/* eslint-disable import/no-cycle */
import React from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestion({ tags, question_abstract }) {
	const tagId = tags?.[0]?.id;
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
	} = useListFaqQuestions({ tagId, limit: 3 });

	return (
		<div>
			{(data?.list.length > 1) ? <span className={styles.relatedquestion}>Related Questions</span> : null}
			{data?.list?.map((tags_question) => (
				<div className={styles.title}>
					{' '}
					{(tags_question?.question_abstract !== question_abstract) ? (
						<div>
							Q.
							{' '}
							{tags_question?.question_abstract}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
}

export default RelatedQuestion;
