import { Pill } from '@cogoport/components';
import { IcMImage, IcMArrowRotateRight, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React } from 'react';

import styles from './styles.module.css';

function QuestionsCollapse({ collapse, questions }) {
	const arrow = collapse;

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{startCase(
					questions.question_abstract,
				)}
				{(arrow) ? <IcMArrowUp /> : <IcMArrowDown />}
			</div>

			<div style={{ display: 'flex' }}>
				<Pill prefix={<IcMImage />} size="sm" color="white"><b>2</b></Pill>
				<Pill
					prefix={<IcMArrowRotateRight />}
					size="sm"
					color="white"
				>
					<b>{questions.view_count}</b>
				</Pill>
				{(questions?.faq_tags || []).map((item) => (
					<Pill
						key={item.display_name}
						size="sm"
						color="white"
					>
						{item.display_name}
					</Pill>
				))}
			</div>
		</div>
	);
}

export default QuestionsCollapse;
