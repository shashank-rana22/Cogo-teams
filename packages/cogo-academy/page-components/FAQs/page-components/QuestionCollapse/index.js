import { Pill } from '@cogoport/components';
import { IcMArrowRotateRight, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
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

				<IcMArrowDown
					width={16}
					height={16}
					className={` ${styles.caret_arrow} ${arrow && styles.caret_active}`}
				/>
			</div>

			<div style={{ display: 'flex' }}>
				{/* <Pill prefix={<IcMImage />} size="sm" color="white"><b>2</b></Pill> */}
				<Pill
					prefix={<IcMArrowRotateRight />}
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
						{item.display_name}
					</Pill>
				))}
			</div>
		</div>
	);
}

export default QuestionsCollapse;
