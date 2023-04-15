import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const CURRENT_STATUS_MAPPING = {
	active: {
		label      : 'Active Test',
		background : '#C4DC91',
	},
	ongoing: {
		label      : 'Ongoing',
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
	published: {
		label      : 'Published',
		background : '#FFFCE6',
	},
};

const handleRedirect = ({ test_id, redirect_to, push }) => {
	const redirection_mapping = {
		test: {
			href : '/learning/tests/[test_id]',
			as   : `/learning/tests/${test_id}`,
		},
		dashboard: {
			href : '/learning/tests/dashboard/[test_id]',
			as   : `/learning/tests/dashboard/${test_id}`,
		},
	};

	const { href, as } = redirection_mapping[redirect_to];

	push(href, as);
};

function TestCard({ test_card }) {
	const { push } = useRouter();

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
	} = test_card || {};

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
						onClick={() => handleRedirect({ test_id: id, redirect_to: 'dashboard', push })}
						role="presentation"
						className={`${styles.check_results} ${styles.arrow}`}
					>
						Check Results
						<span className={styles.icon}><IcMArrowRight /></span>
					</span>
				) : (
					<div className={styles.availability}>
						Available:
						<span className={styles.test_date}>
							{format(validity_start, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
							{' '}
							-
							{' '}
							{format(validity_end, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
						</span>
					</div>
				)}
			</div>

			{['active', 'ongoing'].includes(current_status)
			|| (current_status === 'completed' && attempts_count < maximum_attempts)
				? (
					<div
						role="presentation"
						onClick={() => handleRedirect({ test_id: id, redirect_to: 'test', push })}
						className={styles.arrow}
					>
						<IcMArrowRight
							height={40}
							width={30}
						/>
					</div>
				)
				: null}
		</div>
	);
}

export default TestCard;
