import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const constants = ['topic', 'audience_ids', 'question_type', 'difficulty_level', 'questions'];

const getQuestionType = (question_type) => (question_type === 'case_study' ? 'Case Study' : 'Stand Alone');

const getValue = ({ item, editDetails }) => {
	const { sub_question = [], question_type = '' } = editDetails || {};

	if (item === 'question_type') {
		return getQuestionType(question_type);
	}

	if (item === 'audience_ids') {
		return '--';
	}

	if (item === 'difficulty_level') {
		return startCase(editDetails?.[item] || '--');
	}

	if (item !== 'questions') {
		return editDetails?.[item] || '--';
	}

	return sub_question.length;
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
