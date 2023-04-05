import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const constants = ['topic', 'audience_ids', 'question_type', 'difficulty_level', 'questions'];

const getQuestionType = (question_type) => (question_type === 'case_study' ? 'Case Study' : 'Stand Alone');

const getValue = ({ item, editDetails }) => {
	const { test_case_study_questions = [], question_type = '' } = editDetails || {};

	const MAPPING = {
		question_type    : getQuestionType(question_type),
		audience_ids     : '--',
		difficulty_level : startCase(editDetails?.[item] || '--'),
		topic            : editDetails?.[item] || '--',
		questions        : test_case_study_questions.length,
	};

	return MAPPING[item];
};

function ContentComponent({ editDetails, setShowForm }) {
	return (
		<div className={`${styles.container} ${styles.flex_row} ${styles.flex}`}>
			{constants.map((item) => (
				<div key={item} className={styles.flex_container}>
					<div className={styles.label}>{startCase(item)}</div>

					<div className={styles.value}>
						{getValue({ item, editDetails })}
					</div>
				</div>
			))}

			<div
				role="presentation"
				onClick={() => {
					setShowForm(true);
				}}
				className={styles.button_container}
			>
				<IcMEdit className={styles.button} />
			</div>
		</div>
	);
}

export default ContentComponent;
