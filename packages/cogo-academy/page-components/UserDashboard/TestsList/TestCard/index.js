import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

function TestCard({ test_card }) {
	const {
		name, topics, current_status, validity_start, validity_end, attempts_count, maximum_attempts, id,
	} = test_card;

	const { push } = useRouter();

	const handleGoToTest = (test_id) => {
		const href = '/learning/tests/[test_id]';
		const as = `/learning/tests/${test_id}`;

		push(href, as);
	};

	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.status}>{startCase(current_status)}</div>
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

			{current_status === 'active_test' || (current_status === 'completed' && attempts_count < maximum_attempts)
				? (
					<div role="presentation" onClick={() => handleGoToTest(id)} className={styles.arrow}>
						<IcMArrowRight style={{ height: 40, width: 30 }} />
					</div>
				)
				: null}
		</div>
	);
}

export default TestCard;
