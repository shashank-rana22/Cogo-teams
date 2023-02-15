import { Pill, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function QuestionsBox({ question_detail = {} }) {
	const { question = '', tags = ['a', 'bcvc', 'csdee'], remark = '' } = question_detail || {};

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
						content={startCase(remark)}
					>
						<div className={styles.question}>{startCase(remark)}</div>
					</Tooltip>
				</div>
			</div>

			<div className={styles.question_tags}>
				{tags.map((tag) => <Pill color="blue">{tag}</Pill>)}
			</div>
		</div>
	);
}

export default QuestionsBox;
