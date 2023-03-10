/* eslint-disable import/no-cycle */
import { useRouter } from '@cogoport/next';
import React from 'react';

import useListFaqQuestions from '../../../hooks/useListFaqQuestion';

import styles from './styles.module.css';

function RelatedQuestion({ tags = '', question_abstract = '' }) {
	const tagId = tags?.[0]?.id;
	const router = useRouter();
	const { data } = useListFaqQuestions({ tagId, limit: 3 });

	const handleClick = (id) => {
		router.push(
			`/learning/faq/answer?id=${id}`,
			`/learning/faq/answer?id=${id}`,
		);
	};

	return (
		<div style={{ paddingTop: '1.2%' }}>
			{data?.list.length > 1 && (
				<span className={styles.relatedquestion}>Related Questions</span>
			)}
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
