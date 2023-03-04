/* eslint-disable import/no-cycle */
import React from 'react';

import useListFaqQuestions from '../../../hooks/useListFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestion({ tags='', question_abstract='' }) {
	const tagId = [tags?.[0]?.id];

	const { data } = useListFaqQuestions({ tagId, limit: 3 });

	if ((data?.list || []).length === 0) {
		return null;
	}

	return (
		<div style={{ paddingTop: '1.2%' }}>
			<span className={styles.relatedquestion}>Related Questions</span>

			{(data?.list || []).map((question) => (
				<div className={styles.title}>
					{' '}
					{(question?.question_abstract !== question_abstract) ? (
						<div>
							Q.
							{' '}
							{question?.question_abstract}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
}

export default RelatedQuestion;
