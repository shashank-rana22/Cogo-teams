import { Pill } from '@cogoport/components';
import { IcMArrowRight, IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React } from 'react';

import styles from './styles.module.css';

function QuestionsCollapse({ questions }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div style={{ display: 'flex' }}>
					<div>Q.</div>
					{' '}
					<div className={styles.questions_list}>{questions.question_abstract}</div>

				</div>
				{' '}

				<IcMArrowRight
					className={styles.styledArrowRight}
				/>
			</div>

			<div className={styles.styled_pill_container}>
				<Pill
					prefix={<IcMEyeopen />}
					size="sm"
					color="#fff"
				>
					<strong>{questions.view_count}</strong>
				</Pill>

				{(questions?.faq_tags || []).map((item) => (
					<Pill
						className={styles.questions_tag}
						key={item.display_name}
						size="sm"
						color="#fff"
					>
						<div className={styles.pill_text}>
							{startCase(item?.display_name)}
						</div>
					</Pill>
				))}
			</div>
		</div>
	);
}

export default QuestionsCollapse;
