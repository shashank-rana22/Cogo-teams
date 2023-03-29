import React from 'react';

import useQuestionList from '../../useQuestionList';

import styles from './styles.module.css';

function RelatedQuestion({ query_name = '', question_abstract = '', setQuestion, question }) {
	const { list } = useQuestionList({ query_name, question });

	return (
		<div style={{ paddingTop: '20px' }}>
			{(list || []).length > 1 ? (
				<span className={styles.relatedquestion}>Related Questions</span>
			) : null}
			<div>

				{(list || []).map((questionObj) => (
					<div className={styles.title}>
						{(questionObj?.question_abstract !== question_abstract) ? (
							<div
								role="presentation"
								className={styles.relatedquestion_clickable}
								onClick={() => setQuestion(questionObj)}
							>
								Q.
								{' '}
								{questionObj?.question_abstract}
							</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

export default RelatedQuestion;
