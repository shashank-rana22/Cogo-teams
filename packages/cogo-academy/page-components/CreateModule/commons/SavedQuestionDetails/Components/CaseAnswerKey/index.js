import { Tooltip } from '@cogoport/components';

import getCorrectAnswers from '../../utils/getCorrectAnswers';
import getCorrectAnswersCombined from '../../utils/getCorrectAnswersCombined';

import styles from './styles.module.css';

function CaseAnswerKey({ item, caseToShow }) {
	return (
		<div className={styles.flex_column}>
			<div className={styles.flex_row}>
				<div className={styles.bold}>{`+${item?.sub_question.length} Sub Questions`}</div>
			</div>

			{item.id === caseToShow
				? (
					item?.sub_question.map((item1) => (
						<Tooltip content={(
							<div className={styles.flex_column}>
								{(getCorrectAnswersCombined({
									correctOptions: (item1?.answers || []).filter((item2) => item2.is_correct),
								} || [])).map((item2) => <div className={styles.answer}>{item2}</div>)}
							</div>
						)}
						>
							<div className={styles.answer_key}>{getCorrectAnswers({ answers: item1?.answers })}</div>
						</Tooltip>
					))
				)
				: null}
		</div>
	);
}

export default CaseAnswerKey;
