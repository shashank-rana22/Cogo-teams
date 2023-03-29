import QnAItem from '../QnAItem';

import styles from './styles.module.css';

function CaseStudy({ case_study, user_name }) {
	const { questions_description: { description = '' } = {}, questions } = case_study || {};

	return (
		<div>
			<div className={styles.description}>{description}</div>

			{(questions || []).map((question, index) => (
				<div key={question.question_data.id} className={styles.question_card}>
					<QnAItem data={question} index={index} user_name={user_name} />
				</div>
			))}
		</div>
	);
}

export default CaseStudy;
