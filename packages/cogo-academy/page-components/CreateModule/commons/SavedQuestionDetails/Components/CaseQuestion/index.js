import IconComponent from '../../IconComponent';

import styles from './styles.module.css';

function CaseQuestion({ item, from, caseToShow }) {
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
						{`+${item?.sub_question.length} More`}
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
				? item?.sub_question.map((item1) => <div className={styles.text}>{item1.question_text}</div>)
				: null}
		</div>
	);
}

export default CaseQuestion;
