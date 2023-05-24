import { Accordion } from '@cogoport/components';
import React from 'react';

import AccordianTitleComponent from './AccordianTitleComponent';
import styles from './styles.module.css';
import SubjectiveQuestionItem from './SubjectiveQuestionItem';

function SubjectiveQuestions({ question_item = {}, index = 0, test_id = '' }) {
	const { id = '' } = question_item;

	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title={(<AccordianTitleComponent data={question_item} />)}
				key={index}
				style={{ width: '100%' }}
			>
				<div className={styles.content}>
					<SubjectiveQuestionItem test_id={test_id} question_id={id} index={index} />
				</div>
			</Accordion>
		</div>
	);
}

export default SubjectiveQuestions;
