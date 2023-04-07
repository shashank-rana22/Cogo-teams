/* eslint-disable import/no-cycle */
import { useRouter } from '@cogoport/next';
import React from 'react';

import useListFaqQuestions from '../../../hooks/useListFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestion({ query_name = '', question_abstract = '' }) {
	const router = useRouter();
	const { data } = useListFaqQuestions({ query_name });

	const handleClick = (id) => {
		router.push(
			`/learning/faq/answer?id=${id}`,
			`/learning/faq/answer?id=${id}`,
		);
	};

	return (
		<div style={{ paddingTop: '1.2%' }}>
			{(data?.list || []).length > 1 ? (
				<span className={styles.relatedquestion}>Related Questions</span>
			) : null}
			<div>

				{(data?.list || []).map((question) => (
					<div className={styles.title}>
						{(question?.question_abstract !== question_abstract) ? (
							<div
								role="presentation"
								className={styles.relatedquestion_clickable}
								onClick={() => handleClick(question?.id)}
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
