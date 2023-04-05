import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CaseAnswerType({ item, caseToShow }) {
	const { test_case_study_questions = [] } = item || {};

	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div className={styles.bold}>{`+${test_case_study_questions.length} Sub Questions`}</div>
			</div>

			{item.id === caseToShow
				? test_case_study_questions.map((caseStudyQuestion) => (
					<div className={styles.text} key={caseStudyQuestion.id}>
						{startCase(caseStudyQuestion.question_type)}
					</div>
				))
				: null}
		</div>
	);
}

export default CaseAnswerType;
