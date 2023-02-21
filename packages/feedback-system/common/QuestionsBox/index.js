import { Pill, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function QuestionsBox({ question_detail = {}, questionStatus = '' }) {
	const { question = '', tags = ['a', 'bcvc', 'csdee'], description = '' } = question_detail || {};

	return (
		<div className={styles.container}>
			<div className={styles.question_texts}>
				<div className={styles.question}>
					<Tooltip
						theme="light"
						placement="top-start"
						animation="shift-away"
						content={startCase(question)}
					>
						<div className={styles.question}>{startCase(question)}</div>
					</Tooltip>
				</div>

				<div className={styles.remark}>
					<Tooltip
						theme="light"
						placement="bottom-start"
						animation="shift-away"
						content={startCase(description)}
					>
						<div className={styles.question}>{startCase(description)}</div>
					</Tooltip>
				</div>
			</div>

			{questionStatus !== 'add_weightage' && (
				<div className={styles.question_tags}>
					{(tags || []).map((tag) => <Pill color="#d9eafd">{tag}</Pill>)}
				</div>
			)}
		</div>
	);
}

export default QuestionsBox;
