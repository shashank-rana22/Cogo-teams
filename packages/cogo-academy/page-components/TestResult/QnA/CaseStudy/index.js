import QnAItem from '../QnAItem';

import styles from './styles.module.css';

function CaseStudy({ case_study }) {
	const { questions_description: { description = '' } = {}, questions } = case_study || {};

	return (
		<div>
			<div className={styles.description}>{description}</div>

			{questions.map((question, index) => (
				<div className={styles.question_card}>
					<QnAItem data={question} index={index} />
				</div>
			))}
		</div>
	);
}

export default CaseStudy;
