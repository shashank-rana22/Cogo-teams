import { Accordion, Tooltip, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import toFixed from '../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';
import SubjectiveQuestionItem from './SubjectiveQuestionItem';

function AccordianTitleComponent({ data = {} }) {
	const {
		topic = '',
		question_text = '',
		difficulty_level = '',
		user_appeared_count = 0,
		user_appeared_percent = 0,
	} = data;

	return (
		<div className={styles.container}>
			<div className={styles.topic}>
				<Tooltip content={startCase(topic)} placement="top">
					<Pill size="md" color="#F3FAFA">
						<div className={styles.topic_text}>{startCase(topic)}</div>
					</Pill>
				</Tooltip>

			</div>

			<div className={styles.section}>
				<Tooltip content={startCase(topic)} placement="top">
					<div className={styles.question_text}>{question_text}</div>
				</Tooltip>
			</div>

			<div className={styles.small_section}>{startCase(difficulty_level)}</div>

			<div className={styles.small_section}>
				{`${user_appeared_count} ( ${toFixed(user_appeared_percent, 2)}% )`}
			</div>
		</div>
	);
}

function SubjectiveQuestions({ question_item = {}, index = 0 }) {
	const { explanation = [], question_text = '' } = question_item;

	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title={(<AccordianTitleComponent data={question_item} />)}
				key={index}
				style={{ width: '100%' }}
			>
				<div className={styles.content}>
					<SubjectiveQuestionItem question={question_text} answer={explanation?.[0]} />
				</div>
			</Accordion>
		</div>
	);
}

export default SubjectiveQuestions;
