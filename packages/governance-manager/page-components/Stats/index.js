import useGetStats from '../hooks/useGetStats';

import styles from './styles.module.css';

function Stats() {
	const { data:stats } = useGetStats();

	const STATS_IMAGE_URLS = {
		pending:
		'https://cogoport-testing.sgp1.digitaloceanspaces.com/93e7e3ef7b8aaea36010c16608eb8bef/openmoji_timer.svg',
		approved:
		'https://cogoport-testing.sgp1.digitaloceanspaces.com/75a2231b9871b1f91a26663aa25d2da0/Group%201000010749.svg',
		rejected:
		'https://cogoport-testing.sgp1.digitaloceanspaces.com/2466c7e2faa34ad8f4beb2b110b1ce1e/Group.svg',
	};

	return (
		<div className={styles.stats}>
			<div className={styles.pending}>
				<div className={styles.pending_left}>
					<div className={styles.circle}>
						<img
							src={STATS_IMAGE_URLS.pending}
							alt="pending"
						/>
					</div>
				</div>
				<div className={styles.pending_right}>
					<div className={styles.right_bolder}>{stats?.pending_service_approval}</div>
					<div className={styles.right_lighter}>Suppliers Pending</div>

				</div>
			</div>
			<div className={styles.onboarded_rejected}>
				<div className={styles.onboarded}>
					<div className={styles.onboarded_left}>
						<div className={styles.circle}>
							<img
								src={STATS_IMAGE_URLS.approved}
								alt="approved"
							/>
						</div>
					</div>
					<div className={styles.onboarded_right}>
						<div className={styles.right_bolder}>{stats?.approved_service_approval}</div>
						<div className={styles.right_lighter}>Suppliers Onboarded</div>
					</div>
				</div>
				<div className={styles.rejected}>
					<div className={styles.rejected_left}>
						<div className={styles.circle}>
							<img
								src={STATS_IMAGE_URLS.rejected}
								alt="rejected"
							/>
						</div>
					</div>
					<div className={styles.rejected_right}>
						<div className={styles.right_bolder}>{stats?.rejected_service_approval}</div>
						<div className={styles.right_lighter}>Suppliers Rejected</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Stats;
