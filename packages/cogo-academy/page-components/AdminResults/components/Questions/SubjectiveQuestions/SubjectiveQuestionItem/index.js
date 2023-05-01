import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../CreateModule/components/EmptyState';
import useGetTestResultQuestion from '../../hooks/useGetTestResultQuestion';

import styles from './styles.module.css';

function SubjectiveQuestionItem({ test_id = '', question_id = '' }) {
	const { data = {}, loading } = useGetTestResultQuestion({ test_id, question_id });

	const { question_data = {}, answers = {} } = data;

	const { question = '' } = question_data || {};

	const { answer_text = '' } = answers || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder height="24px" style={{ marginBottom: '20px' }} />
				<Placeholder height="80px" />
			</div>
		);
	}

	if (isEmpty(data)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.question_text}>{`Q ${question}`}</div>

			<div className={styles.answer_text}>
				<strong>Answer:</strong>

				<div dangerouslySetInnerHTML={{ __html: answer_text }} />
			</div>
		</div>
	);
}

export default SubjectiveQuestionItem;
