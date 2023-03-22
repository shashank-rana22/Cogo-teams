import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Introduction({ setActiveState, loading, testData = {}, setStartTiming }) {
	const { set_data, case_study_questions, stand_alone_questions, test_duration, name } = testData || {};

	const formatArrayValues = (items) => {
		const formattedItem = items?.map((item) => item.topic);
		return formattedItem?.join(',  ') || '';
	};

	const CONTENT_MAPPING = {
		topics_covered: {
			title : 'Topics Covered',
			value : formatArrayValues(set_data),
			icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/document-svg.svg',
		},
		number_of_questions: {
			title : 'No. of questions',
			value : `${case_study_questions} Case Study Questions,
					${stand_alone_questions} Standalone Questions`,
		},
		duration: {
			title : 'Duration',
			value : `${test_duration} min`,
			icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg',
		},
	};
	const time = new Date();
	setStartTiming(time);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{name}
			</div>

			<div className={styles.content}>
				{Object.values(CONTENT_MAPPING).map((content) => {
					const { icon, title, value } = content;

					return (
						<div className={styles.content_container}>
							{icon ? <img style={{ width: 18, height: 21, marginRight: 12 }} src={icon} alt="" /> : null}

							<div className={styles.content_text}>
								<div className={styles.label}>{title}</div>
								<div className={styles.value}>{value}</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button type="button" onClick={() => setActiveState('ongoing')}>
					Start your test
					{' '}
					<IcMArrowRight />
				</Button>
			</div>
		</div>
	);
}

export default Introduction;
