import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TestCard({ test_card }) {
	console.log(test_card, 'test_card');

	const { name, topics } = test_card;

	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.status}>Upcoming</div>
				<div className={styles.heading}>
					{name}
				</div>
				<div className={styles.topics}>
					{(topics || []).map((topic_item) => (
						<div className={styles.topic_item}>{topic_item}</div>
					))}
				</div>
				<div className={styles.availability}>
					Available:
					<span className={styles.test_date}>12 March&apos;22 Onwards</span>
				</div>
			</div>
			<div className={styles.arrow}>
				<IcMArrowRight style={{ height: 40, width: 30 }} />
			</div>
		</div>
	);
}

export default TestCard;
