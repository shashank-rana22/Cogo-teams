import IconComponent from '../../IconComponent';

import styles from './styles.module.css';

function CaseQuestion({ item, from, caseToShow, setQuestionToShow, setCaseToShow }) {
	const { test_case_study_questions = [], id = '' } = item || {};

	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div
					role="presentation"
					onClick={() => setQuestionToShow(id)}
					className={`${styles.question_text} ${(from === 'tooltip') ? styles.question_text_content : null}`}
				>
					{item?.question_text}
				</div>

				{from !== 'tooltip' ? (
					<div
						role="presentation"
						onClick={() => setCaseToShow(item.id === caseToShow ? '' : item.id)}
						style={{ marginLeft: '8px' }}
						className={styles.bold}
					>
						{`+${test_case_study_questions.length} More`}
						{' '}
						<IconComponent
							style={{ marginTop: '8px' }}
							item={item}
							caseToShow={caseToShow}
						/>
					</div>
				) : null}
			</div>

			{item.id === caseToShow
				? test_case_study_questions.map((caseStudyQuestion) => (
					<div
						className={styles.text}
						key={caseStudyQuestion.id}
					>
						{caseStudyQuestion.question_text}
					</div>
				))
				: null}
		</div>
	);
}

export default CaseQuestion;
