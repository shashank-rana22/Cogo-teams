import React from 'react';

import useQuestionList from '../../useQuestionList';

import styles from './styles.module.css';

function RelatedQuestion({ query_name = '', question_abstract = '', setQuestion }) {
	const { list } = useQuestionList({ query_name });

	return (
		<div style={{ paddingTop: '20px' }}>
			{(list || []).length > 1 ? (
				<span className={styles.relatedquestion}>Related Questions</span>
			) : null}
			<div>

				{(list || []).map((question) => (
					<div className={styles.title}>
						{(question?.question_abstract !== question_abstract) ? (
							<div
								role="presentation"
								className={styles.relatedquestion_clickable}
								onClick={() => setQuestion(question)}
							>
								Q.
								{' '}
								{question?.question_abstract}
							</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

export default RelatedQuestion;
