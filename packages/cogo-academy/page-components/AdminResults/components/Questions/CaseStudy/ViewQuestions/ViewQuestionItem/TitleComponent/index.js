import { startCase } from '@cogoport/utils';

import styles from '../styles.module.css';

function TitleComponent({
	correct_answer_percentage,
	question,
	question_type,
}) {
	return (
		<div role="presentation" className={styles.container}>
			<div className={styles.section}>
				{question}
			</div>

			<div className={styles.small_section}>
				{startCase(question_type)}
			</div>

			<div className={styles.small_section}>
				{correct_answer_percentage}
			</div>
		</div>
	);
}
export default TitleComponent;
