import { IcMArrowRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function TestCard({ test_card }) {
	const { name, topics, current_status, validity_start, validity_end, attempts_count, maximum_attempts } = test_card;

	console.log(format(validity_start, 'dd MMM\' yy'), 'test_card');

	const handleGoToTest = () 

	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.status}>{current_status}</div>
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
					<span className={styles.test_date}>
						{format(validity_start, 'dd MMM\' yy')}
						{' '}
						-
						{' '}
						{format(validity_end, 'dd MMM\' yy')}
					</span>
				</div>
			</div>
			{current_status === 'active' || (current_status === 'ongoing' && attempts_count < maximum_attempts)
				? 			(
					<div role="presentation" onClick={handleGoToTest} className={styles.arrow}>
						<IcMArrowRight style={{ height: 40, width: 30 }} />
					</div>
				)
				: null}
		</div>
	);
}

export default TestCard;
