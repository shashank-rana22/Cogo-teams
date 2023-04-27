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
					<div style={{ flexWrap: 'wrap' }}>{questions.question_abstract}</div>

				</div>
				{' '}

				<IcMArrowRight style={{ alignItems: 'center', marginTop: '22px' }} width={16} height={16} />
			</div>

			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<Pill
					prefix={<IcMEyeopen />}
					size="sm"
					color="white"
				>
					<b>{questions.view_count}</b>
				</Pill>

				{(questions?.faq_tags || []).map((item) => (
					<Pill
						className={styles.questions_tag}
						key={item.display_name}
						size="sm"
						color="white"
					>
						{startCase(item.display_name)}
					</Pill>
				))}
			</div>
		</div>
	);
}

export default QuestionsCollapse;
