import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const CURRENT_STATUS_MAPPING = {
	active: {
		label      : 'Active Test',
		background : '#C4DC91',
	},
	upcoming: {
		label      : 'Upcoming',
		background : '#FFFCE6',
	},
	completed: {
		label      : 'Completed',
		background : '#FEF3E9',
	},
	expired: {
		label      : 'Expired',
		background : '#FDEBE9',
	},
};

function TestCard({ test_card }) {
	const {
		name,
		topics,
		current_status,
		validity_start,
		validity_end,
		attempts_count,
		maximum_attempts,
		id,
		status,
	} = test_card;

	const { push } = useRouter();

	const handleGoToTest = (test_id) => {
		const href = '/learning/tests/[test_id]';
		const as = `/learning/tests/${test_id}`;

		push(href, as);
	};

	const handleGoToResults = (test_id) => {
		const href = '/learning/tests/dashboard/[test_id]';
		const as = `/learning/tests/dashboard/${test_id}`;

		push(href, as);
	};

	const { label = '', background = '' } = CURRENT_STATUS_MAPPING[current_status] || {};

	return (
		<div className={styles.main_container}>
			<div>
				<div style={{ background }} className={styles.status}>{label}</div>

				<div className={styles.heading}>
					{name}
				</div>

				<div className={styles.topics}>
					{(topics || []).map((topic_item) => (
						<div key={topic_item} className={styles.topic_item}>{topic_item}</div>
					))}
				</div>

				{status === 'published' ? (
					<span
						onClick={() => handleGoToResults(id)}
						role="presentation"
						className={`${styles.check_results} ${styles.arrow}`}
					>
						Check Results
						{' '}
						<span className={styles.icon}><IcMArrowRight /></span>
					</span>
				) : (
					<div className={styles.availability}>
						Available:
						<span className={styles.test_date}>
							{format(validity_start, 'dd MMM yy')}
							{' '}
							-
							{' '}
							{format(validity_end, 'dd MMM yy')}
						</span>
					</div>
				)}
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
