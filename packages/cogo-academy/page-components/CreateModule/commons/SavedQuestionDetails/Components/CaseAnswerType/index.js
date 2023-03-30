import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CaseAnswerType({ item, caseToShow }) {
	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div className={styles.bold}>{`+${item?.sub_question.length} Sub Questions`}</div>
			</div>

			{item.id === caseToShow
				? item?.sub_question.map((item1) => (
					<div className={styles.text}>{startCase(item1.question_type)}</div>
				))
				: null}
		</div>
	);
}

export default CaseAnswerType;
