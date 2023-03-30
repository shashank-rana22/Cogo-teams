import IconComponent from '../../IconComponent';

import styles from './styles.module.css';

function CaseQuestion({ item, from, caseToShow }) {
	const { test_case_study_questions = [] } = item || {};

	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div
					style={
                    from === 'tooltip' ? { overflow: 'unset', textOverflow: 'unset', whiteSpace: 'unset' } : null
                }
					className={styles.question_text}
				>
					{item?.question_text}
				</div>

				{from !== 'tooltip' ? (
					<div style={{ marginLeft: '8px' }} className={styles.bold}>
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
				? test_case_study_questions.map((item1) => <div className={styles.text}>{item1.question_text}</div>)
				: null}
		</div>
	);
}

export default CaseQuestion;
